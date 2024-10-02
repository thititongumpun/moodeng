type Props = {
  page: number;
  setPage: (newPage: number) => void;
  hasMore: boolean;
};

export default function Pagination({ page, setPage, hasMore }: Props) {
  return (
    <div className="pb-14 md:p-0">
      <div className="flex justify-center">
        <div className="join grid max-w-xs grid-cols-3 gap-2 sm:max-w-sm lg:max-w-md">
          {/* Previous Button */}
          <input
            className="btn btn-outline join-item px-6 py-2 text-lg sm:text-xl"
            type="button"
            name="options"
            aria-label="Previous"
            value="Prev"
            onClick={() => setPage(page > 0 ? page - 1 : 0)}
            disabled={page === 0}
          />

          {/* Current Page */}
          <span className="btn btn-outline join-item px-6 py-2 text-lg sm:text-xl">
            {page + 1}
          </span>

          {/* Next Button */}
          <input
            className="btn btn-outline join-item px-6 py-2 text-lg sm:text-xl"
            type="button"
            name="options"
            aria-label="Next"
            value="Next"
            onClick={() => setPage(page + 1)}
            disabled={!hasMore}
          />
        </div>
      </div>
    </div>
  );
}
