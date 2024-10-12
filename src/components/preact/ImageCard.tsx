import { useState } from "preact/hooks";

type ImageCardProps = {
  url: string;
  name: string;
};

export default function ImageCard({ url, name }: ImageCardProps) {
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  return (
    <>
      <div
        className="card card-bordered w-full cursor-pointer bg-base-100 shadow-lg transition-shadow duration-200 ease-in-out hover:shadow-xl"
        onClick={handleOpenModal}
      >
        <figure className="overflow-hidden rounded-t-lg">
          <img
            src={url}
            alt={name}
            width="400"
            height="400"
            className="aspect-square h-full w-full object-cover"
            loading="lazy"
            srcSet={`${url}?w=300 300w, ${url}?w=600 600w, ${url}?w=900 900w`}
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title prose-sm md:prose-lg">{name}</h2>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative p-0">
            <button
              className="btn btn-circle btn-sm absolute right-2 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <img
              src={url}
              alt={name}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
