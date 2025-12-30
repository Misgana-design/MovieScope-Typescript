import {
  fetchTrending,
  original_image_base_url,
  api_key,
  api_url,
} from "../hook/useTMDBApi.ts";
import "./Search.css";
import { useQuery } from "@tanstack/react-query";
import type { Movie, Logo } from "../types/movie.ts";
import { fetchTrendingTvSeries } from "../hook/useTMDBApi.ts";
import { useFavorites } from "../context/FavoritesContext.tsx";
// import { type MouseEventHandler } from "react";
import "../pages/Search.css";
import axios from "axios";
import { Link } from "react-router-dom";

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
    data = [],
    isLoading: loading,
    error: isError,
  } = useQuery<Movie[]>({
    queryKey: ["trendingTv"],
    queryFn: fetchTrendingTvSeries,
  });

  const { data: logo = [] } = useQuery<Logo[]>({
    queryKey: ["logo", movies[0]?.id],
    queryFn: async () => {
      const res = await axios.get(
        `${api_url}/movie/${movies[0].id}/images?api_key=${api_key}`
      );
      return res.data.logos;
    },
  });

  const { addFavorites, removeFavorites, isFavorite } = useFavorites();

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

  // interface clickEvents {
  //   onClick: (event: MouseEventHandler<HTMLButtonElement> | undefined) => void;
  // }

  return (
    <>
      {movies[0] && typeof movies[0].backdrop_path === "string" && (
        <div className="relative mt-12">
          <div
            style={{
              backgroundImage: `url(${original_image_base_url}${movies[0].backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              width: "100%",
              maxHeight: "500px",
              aspectRatio: "16/9",
            }}
            className="max hidden lg:block md:block"
          ></div>
          <div
            style={{
              backgroundImage: `url(${original_image_base_url}${movies[0].poster_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              width: "100%",
              maxHeight: "400px",
              aspectRatio: "4/4",
              justifyContent: "center",
            }}
            className="max lg:hidden md:hidden"
          ></div>
          <div className="absolute top-20 sm:top-20 md:top-32 lg:top-32 sm:mx-20 mx-10">
            {/* <p className="font-bold text-7xl py-4 bg-linear-to-r from-blue-500 to-green-500 text-transparent bg-clip-text title">
              {typeof firstMovie.title === "string"
                ? firstMovie.title
                : "No title for this movie"}
            </p> */}
            <div>
              {logo[0] && logo[0]?.iso_639_1 === "en" && (
                <>
                  <img
                    className="lg:w-60 md:w-50 w-40 h-auto"
                    src={`${original_image_base_url}${logo[0]?.file_path}`}
                    alt={movies[0].title}
                  />
                </>
              )}
            </div>

            <div className="line-clamp-4 text-white lg:text-lg md:text-base text-sm md:w-100 lg:w-100 font-mono lg:mt-3 ">
              {typeof movies[0].overview === "string"
                ? movies[0].overview
                : "No overview for this movie"}
            </div>
            <button className="lg:w-30 lg:h-10 lg:text-lg md:w-27 md:h-9 md:text-base text-sm w-23 h-7 font-bold mt-3 border-green-500 text-white border-2 rounded hover:bg-green-500 hover:text-black duration-150 hover:cursor-pointer">
              Watch now
            </button>
          </div>
        </div>
      )}
      {movies && (
        <>
          <hr className="border-2 border-white" />
          <div className="lg:text-3xl md:text-2xl text-xl font-bold text-white px-22 mt-25">
            Trending movies this week
            <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="relative hover:cursor-pointer hover:scale-110 duration-150"
                >
                  <div>
                    {typeof movie.poster_path === "string" && (
                      <Link to={`/movie/${movie.id}`}>
                        <img
                          src={`${original_image_base_url}${movie.poster_path}`}
                          alt={movie.poster_path ?? movie.title}
                        />
                      </Link>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      isFavorite(movie)
                        ? removeFavorites(movie)
                        : addFavorites(movie)
                    }
                    className="absolute left-0.5 bottom-2 bg-linear-to-r from-blue-500 to-green-500 p-1 md:p-1.5 lg:p-2 rounded-full cursor-pointer"
                  >
                    {isFavorite(movie) ? "♥" : "♡"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <div className="lg:text-3xl md:text-2xl text-xl text-white font-bold px-22 mt-15">
        Trending TV series this week
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8 ">
          {data?.map((tv) => (
            <div
              key={tv.id}
              className="relative hover:cursor-pointer hover:scale-110 duration-150"
            >
              <Link to={`/tv/${tv.id}`}>
                <div>
                  <img
                    src={`${original_image_base_url}${tv.poster_path}`}
                    alt={`${tv.title}`}
                  />
                </div>
              </Link>

              <button
                onClick={() =>
                  isFavorite(tv) ? removeFavorites(tv) : addFavorites(tv)
                }
                className="absolute left-0.5 bottom-2 bg-linear-to-r from-blue-500 to-green-500 p-1 md:p-1.5 lg:p-2 rounded-full "
              >
                {isFavorite(tv) ? "♥" : "♡"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <hr className="border-gray-400 border-t-2 my-4" />
    </>
  );
}
