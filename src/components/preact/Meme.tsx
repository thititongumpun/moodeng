import type { Meme } from "@/types/Meme";
import ImageLoader from "@/components/preact/ImageLoader";
import { useEffect, useState } from "preact/hooks";
import { getAllMeme } from "@/lib/queryFn";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "./Pagination";
import ImageCard from "./ImageCard";

type MemeProps = {
  search?: string;
};

export default function Meme({ search }: MemeProps) {
  const [page, setPage] = useState(0);
  const limit = 12;

  useEffect(() => {
    setPage(0);
  }, [search]);

  const { data, isLoading, isPlaceholderData } = useQuery<Meme[]>({
    queryKey: ["memeImages", page, search],
    queryFn: () =>
      getAllMeme({
        folder: "images",
        offset: page * limit,
        limit,
        search: search || "",
      }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      const preloadedImages = data
        .slice(0, 8)
        .filter((item) => !item.name.startsWith(".empty"));
      preloadedImages.map((item) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = item.url;
        document.head.appendChild(link);

        return () => {
          document.head.removeChild(link);
        };
      });
    }
  }, [data]);

  if (isLoading && !isPlaceholderData) return <ImageLoader />;

  return (
    <section className="p-2">
      <div className="grid grid-cols-2 gap-8 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {data
          ?.filter((item) => !item.name.startsWith(".empty"))
          .map((item) => {
            return (
              // <div
              //   key={item.name}
              //   className="card card-bordered w-full bg-base-100 shadow-lg transition-shadow duration-200 ease-in-out hover:shadow-xl"
              // >
              //   <figure className="overflow-hidden rounded-t-lg">
              //     <img
              //       src={item.url}
              //       alt={item.name}
              //       width="400"
              //       height="400"
              //       className="aspect-square h-auto w-full object-fit"
              //       loading="lazy"
              //     />
              //   </figure>
              //   <div className="card-body">
              //     <h2 className="prose-sm md:prose-lg card-title">
              //       {item.name}
              //     </h2>
              //   </div>
              // </div>
              <ImageCard key={item.name} name={item.name} url={item.url} />
            );
          })}
      </div>

      <div className="mt-10 flex justify-center pb-4">
        <Pagination
          page={page}
          setPage={setPage}
          hasMore={data?.length === limit}
        />
      </div>
    </section>
  );
}
