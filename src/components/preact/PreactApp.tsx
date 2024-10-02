import { useState } from "preact/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense, lazy } from "preact/compat";

const Search = lazy(() => import("@/components/preact/Search"));
const Meme = lazy(() => import("@/components/preact/Meme"));
const Loading = lazy(() => import("@/components/preact/Loading"));

export default function PreactApp() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={client}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="p-0">
      <Suspense fallback={<Loading />}>
      <Search search={search} setSearch={setSearch} />
      <Meme search={search} />
      </Suspense>
    </div>
  );
};
