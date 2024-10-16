export default function ImageLoader() {
  const arrays = Array.from({ length: 10 });
  return (
    <section className="p-1">
      <div className="grid grid-cols-2 gap-8 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {Array.from({ length: 18 }).map((_, i) => {
          return (
            <div
              key={i}
              className="card card-bordered w-full bg-base-100 shadow-2xl"
            >
              <div className="card-body">
                <div className="skeleton h-4 w-full"></div>
              </div>
              <figure>
                <div className="skeleton aspect-square w-[350px]"></div>
              </figure>
            </div>
          );
        })}
      </div>
    </section>
  );
}
