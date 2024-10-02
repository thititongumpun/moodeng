import { useState } from "preact/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense, lazy } from "preact/compat";

const Search = lazy(() => import("@/components/preact/Search"));
const Meme = lazy(() => import("@/components/preact/Meme"));
const Loading = lazy(() => import("@/components/preact/Loading"));
const UploadForm = lazy(() => import("@/components/preact/UploadForm"));

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function PreactApp() {
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
    <div className="py-8 md:p-1">
      <Suspense fallback={<Loading />}>
        <div className="mx-auto flex items-center justify-center gap-4">
          <div className="inline-flex items-center space-x-4">
            <Search search={search} setSearch={setSearch} />
            <UploadForm />
          </div>
        </div>

        <Meme search={search} />
      </Suspense>
    </div>
  );
};
