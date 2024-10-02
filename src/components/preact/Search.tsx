import type { h } from "preact";
import { useEffect, useState } from "preact/hooks";

type SearchProps = {
  search: string;
  setSearch: (query: string) => void;
};

export default function Search({ search, setSearch }: SearchProps) {
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (
    event: h.JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    setDebouncedSearch(event.currentTarget.value);
    setIsLoading(true);
  };

  const clearSearch = () => {
    setDebouncedSearch("");
    setSearch("");
    setIsLoading(false);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(debouncedSearch);
      setIsLoading(false);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearch, setSearch]);
  return (
    <div className="form-control relative mx-auto max-w-sm items-center justify-center md:max-w-lg">
      <input
        type="text"
        placeholder="Search memes..."
        className="input input-bordered w-full"
        value={debouncedSearch}
        onChange={handleSearchChange}
      />
      {!isLoading && debouncedSearch && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-8 top-1/2 -translate-y-1/2 transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {isLoading && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 transform">
          <span className="loading loading-spinner loading-xs"></span>
        </div>
      )}
    </div>
  );
}
