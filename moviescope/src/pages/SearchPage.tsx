import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../hook/useTMDBApi";
import { useState } from "react";
import { original_image_base_url } from "../hook/useTMDBApi";
import type { Movie } from "../types/movie";
import "../pages/Search.css";

export function SearchPage() {
  const [query, setQuery] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const value = formData.get("search");

    if (typeof value === "string") {
      setQuery(value.trim());
    }
  }

  const { data = [] } = useQuery<Movie[] | undefined>({
    queryKey: ["query", query],
    queryFn: () => {
      return searchMovies(query);
    },
  });

  return (
    <>
      <div className="flex justify-center">
        <div className="mt-40">
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl search">
            Search for movies
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              className="focus:outline-none mt-3 focus:border-green-500 border-2 rounded-full bg-white px-4 py-1 text-sm w-56 h-8 md:w-90 md:h-10 lg:w-110 lg:h-12"
              type="text"
              name="search"
              placeholder="🔍︎ Search for movies"
            />
          </form>
        </div>
      </div>

      <div>
        {query && data.length === 0 && (
          <>
            <h1 className="font-mono bg-linear-to-r from-blue-500 to-green-500 text-transparent bg-clip-text text-center text-2xl md:text-3xl lg:text-4xl mt-5">
              No movies found
            </h1>
          </>
        )}
      </div>

      <div>
        {data.length > 0 && (
          <>
            <hr className="border-white border-2 my-8" />
            <h1 className="bg-linear-to-r from-blue-500 to-green-500 text-transparent bg-clip-text text-center lg:text-4xl md:text-3xl text-2xl font-mono ">{`Your results for the movie "${query}"`}</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-22 mt-5 ">
              {data?.length > 0 &&
                data
                  ?.filter((movie) => movie && movie.id && movie.poster_path)
                  .map((movie) => (
                    <div className="hover:cursor-pointer hover:scale-110 duration-150">
                      <img
                        src={original_image_base_url + movie.poster_path}
                        alt={movie.poster_path}
                      />
                    </div>
                  ))}
            </div>
            <hr className="border-white border-2 my-8" />
          </>
        )}
      </div>
    </>
  );
}
