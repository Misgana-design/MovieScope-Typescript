import { fetchTrending, original_image_base_url } from "../hook/useTMDBApi.ts";
import { useQuery } from "@tanstack/react-query";
import type { Movie } from "../types/movie.ts";
import { fetchTrendingTvSeries } from "../hook/useTMDBApi.ts";

export function HomePage() {
  const {
    data: movies = [],
    isLoading,
    error,
    isFetching,
  } = useQuery<Movie[]>({
    queryKey: ["trending"],
    queryFn: fetchTrending,
    staleTime: 1000 * 50,
    refetchOnWindowFocus: true,
  });

  const {
    data,
    isLoading: loading,
    error: isError,
  } = useQuery<Movie[]>({
    queryKey: ["trendingTv"],
    queryFn: fetchTrendingTvSeries,
  });

  if (isLoading || loading)
    return <p className="text-center text-white text-3xl mt-30">Loading...</p>;
  if (error || isError)
    return (
      <p className="text-center text-red-500 text-3xl mt-30">
        Something went wrong
      </p>
    );

  if (isFetching)
    return (
      <p className="text-center text-white text-3xl mt-30">
        Background Fetching
      </p>
    );

  const firstMovie = movies[0];

  return (
    <>
      {firstMovie && typeof firstMovie.backdrop_path === "string" && (
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
              {typeof firstMovie.title === "string"
                ? firstMovie.title
                : "No title for this movie"}
            </p>
            <div className="text-white w-100 font-mono mt-3">
              {typeof firstMovie.overview === "string"
                ? firstMovie.overview
                : "No overview for this movie"}
            </div>
            <button className="w-30 h-10 text-lg font-bold mt-3 border-green-500 text-white border-2 rounded hover:bg-green-500 hover:text-black duration-150">
              Watch now
            </button>
          </div>
        </div>
      )}
      {movies && (
        <div className="text-3xl font-bold text-white px-22 mt-15">
          Trending movies this week
          <div className="grid grid-cols-5 gap-6 mt-8">
            {movies.map((movie) => (
              <div key={movie.id}>
                <div>
                  {typeof movie.poster_path === "string" && (
                    <img
                      src={`${original_image_base_url}${movie.poster_path}`}
                      alt={movie.poster_path ?? movie.title}
                    />
                  )}
                </div>
                <button>♥ ♡</button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="text-3xl text-white font-bold px-22 mt-15">
        Trending TV series this week
        <div className="grid grid-cols-5 gap-5 mt-8">
          {data?.map((tv) => (
            <img
              src={`${original_image_base_url}${tv.poster_path}`}
              alt={`${tv.title}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
