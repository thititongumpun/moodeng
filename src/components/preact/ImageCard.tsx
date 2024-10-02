type ImageCardProps = {
  url: string;
  name: string;
};

export default function ImageCard({ url, name }: ImageCardProps) {
  return (
    <div className="card card-bordered w-full bg-base-100 shadow-lg transition-shadow duration-200 ease-in-out hover:shadow-xl">
      <figure className="overflow-hidden rounded-t-lg">
        <img
          src={url}
          alt={name}
          width="400"
          height="400"
          className="object-fit aspect-square h-auto w-full"
          loading="lazy"
          srcSet={`${url}?w=300 300w, ${url}?w=600 600w, ${url}?w=900 900w`}
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </figure>
      <div className="card-body">
        <h2 className="prose-sm md:prose-lg card-title">{name}</h2>
      </div>
    </div>
  );
}
