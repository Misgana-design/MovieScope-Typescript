import { searchMovies, original_image_base_url } from "../hook/useTMDBApi.ts";
import { useQuery } from "@tanstack/react-query";

export function HomePage() {
  const {
    data: movies = [],
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["trending"],
    queryFn: searchMovies,
    staleTime: 1000 * 50,
    refetchOnWindowFocus: true,
  });
  const firstMovie = movies[0] || [];

  if (isLoading)
    return <p className="text-center text-white text-3xl mt-30">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-white text-3xl mt-30">
        Something went wrong
      </p>
    );

  return (
    <>
      <div className="flex items-center gap-5 px-22 mt-26">
        <div
          style={{
            backgroundImage: `url(${original_image_base_url}${firstMovie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            width: "100%",
            maxHeight: "500px",
            aspectRatio: "4/3",
          }}
        ></div>
        <div>
          <p className="font-extrabold text-7xl py-4 bg-linear-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
            {firstMovie.title}
          </p>
          <div className="text-white w-100 font-mono mt-3">
            {firstMovie.overview}
          </div>
          <button className="w-30 h-10 text-lg font-bold mt-3 border-green-500 text-white border-2 rounded hover:bg-green-500 hover:text-black duration-150">
            Watch now
          </button>
        </div>
      </div>
      <div className="text-3xl font-bold text-white px-22 mt-15">
        Trending movies this week
        <div className="grid grid-cols-5 gap-6 mt-8">
          {movies.map((movie: any) => (
            <div key={movie.id} className="">
              <div>
                <img
                  src={`${original_image_base_url}${movie.poster_path}`}
                  alt={movie.poster_path ?? movie.title}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
