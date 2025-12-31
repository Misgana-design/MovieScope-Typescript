import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { api_key, api_url, original_image_base_url } from "../hook/useTMDBApi";
import { useFavorites } from "../context/FavoritesContext";

export function TvDetail() {
  const { id } = useParams();
  const { isFavorite, addFavorites, removeFavorites } = useFavorites();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tv", id],
    queryFn: async () => {
      try {
        const res = await axios.get(`${api_url}/tv/${id}?api_key=${api_key}`);
        return res.data;
      } catch (error) {
        console.error("Error occured", error);
        throw error;
      }
    },
  });

  const { data: logo = [] } = useQuery({
    queryKey: ["logo", id],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${api_url}/tv/${id}/images?api_key=${api_key}`
        );
        return res.data.logos;
      } catch (error) {
        console.error("Error occured", error);
        throw error;
      }
    },
  });

  if (isLoading)
    return (
      <h1 className="text-white text-3xl mt-25 text-center">Loading...</h1>
    );
  if (error)
    return (
      <h1 className="text-red-500 text-3xl mt-25 text-center">
        Something went wrong
      </h1>
    );

  return (
    <>
      <div>
        <div className="flex justify-center items-center lg:mt-20 mt-40 lg:gap-20 gap-5">
          <img
            src={original_image_base_url + data.backdrop_path}
            alt={data.title}
            className="lg:w-100 md:w-70 w-50 h-auto aspect-square object-cover"
          />
          <div>
            {logo[0] && logo[0].iso_639_1 === "en" ? (
              <img
                src={original_image_base_url + logo[0].file_path}
                alt={data.title}
                className="lg:w-50 md:w-40 w-30"
              />
            ) : (
              <>
                <h1 className="font-bold lg:text-3xl md:text-2xl text-xl line-clamp-4 bg-linear-to-r from-blue-500 to-green-500 text-transparent bg-clip-text w-70">
                  {data.title}
                </h1>
              </>
            )}
            <h1 className="md:line-clamp-3 line-clamp-2 lg:w-100 w-50 lg:text-xl md:text-base text-sm text-white font-mono">
              {data.overview}
            </h1>
            <h1 className="text-red-400 font-mono">{`Popularity: ${data.popularity}`}</h1>
            <h1 className="text-green-500 font-mono">{`Release: ${data.release_date}`}</h1>
            <h1 className="text-indigo-600 font-mono">{`vote_average: ⭐${data.vote_average.toFixed(
              1
            )}`}</h1>
            <h1 className="text-amber-400 font-mono">{`vote_count: ${data.vote_count}`}</h1>
            <button
              onClick={() =>
                isFavorite(data) ? removeFavorites(data) : addFavorites(data)
              }
              className="lg:w-30 lg:h-10 lg:text-lg md:w-27 md:h-9 md:text-base text-sm w-23 h-7 font-bold mt-3 border-green-500 text-white border-2 rounded hover:bg-green-500 hover:text-black duration-150 hover:cursor-pointer"
            >
              {isFavorite(data) ? "Unfavorite it" : "Favorite it"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
