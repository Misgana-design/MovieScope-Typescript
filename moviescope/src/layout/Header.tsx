import { Link } from "react-router-dom";

export function Header() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10  flex justify-between text-white px-20 py-1 text-2xl">
        <p className="text-3xl font-bold text-green-500">🎬MovieScope</p>
        <ul className="flex gap-20 ">
          <Link to={"/"}>
            <li className="hover:bg-gray-700 hover:cursor-pointer py-1 px-3">
              Home
            </li>
          </Link>
          <Link to={"/Search"}>
            <li className="hover:bg-gray-700 hover:cursor-pointer py-1 px-3">
              Search
            </li>
          </Link>
          <Link to={"/Favorites"}>
            <li className="hover:bg-gray-700 hover:cursor-pointer py-1 px-3">
              Favorites
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}
