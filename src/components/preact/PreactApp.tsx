import { useState } from "preact/hooks";
import Search from "@/components/preact/Search";
import Meme from "@/components/preact/Meme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {};

export default function PreactApp({}: Props) {
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
      <Search search={search} setSearch={setSearch} />
      <Meme search={search} />
    </div>
  );
};
