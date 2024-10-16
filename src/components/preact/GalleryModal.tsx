import type { Meme } from "@/types/Meme";
import SliderModal from "./SliderModal";

type Props = {
  data: Meme[] | undefined;
};

export default function GalleryModal({ data }: Props) {
  return (
    <>
      <div className="container mx-auto columns-3">
        {data?.map((item) => (
          <SliderModal
            item={item}
            itemArr={data}
            uniqueId={`id-${item.name}`}
          />
        ))}
      </div>
    </>
  );
}
