import { useFavorites } from "../context/FavoritesContext";
import { original_image_base_url } from "../hook/useTMDBApi.ts";

export function FavoritesPage() {
  const { state, removeFavorites } = useFavorites();
  if (state.length === 0) {
    return (
      <>
        <h1 className="mt-25 text-5xl bg-linear-to-tr from-blue-500 to-green-500 text-transparent bg-clip-text font-bold text-center font-serif">
          No Favorites Added
        </h1>
        <h1 className="text-center text-7xl mt-7">😔</h1>
      </>
    );
  }
  return (
    <>
      {state && (
        <>
          <h1 className="text-5xl font-mono bg-linear-to-r from-blue-500 to-green-500 text-transparent bg-clip-text mt-15 text-center">
            Your Favorites
          </h1>
          <div className="grid grid-cols-5 gap-6 px-22 mt-15">
            {state.map((fav) => (
              <>
                <div className="relative hover:scale-110 duration-150 hover:cursor-pointer">
                  <img
                    src={original_image_base_url + fav.poster_path}
                    alt={fav.title}
                  />
                  <button
                    onClick={() => {
                      removeFavorites(fav);
                    }}
                    className="absolute left-2 bottom-2 p-1 rounded-full text-5xl text-white hover:cursor-pointer bg-linear-to-r from-blue-500 to-green-500 "
                  >
                    ♥
                  </button>
                </div>
              </>
            ))}
          </div>
          <hr className="border-gray-400 border-t-2 my-4" />
        </>
      )}
    </>
  );
}
