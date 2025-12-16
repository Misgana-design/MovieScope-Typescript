import '../pages/Search.css' 

export function SearchPage() {
  return (
    <>
      <div className="flex justify-center">
        <div className="mt-40">
          <h1 className="text-white text-6xl search">Search for movies</h1>
          <input
            className="mt-3 border-green-500 border-2 rounded-full bg-white px-4 py-1"
            type="text"
            placeholder="🔍︎ Search for movies"
          />
        </div>
      </div>
    </>
  );
}
