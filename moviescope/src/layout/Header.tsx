import { Link } from "react-router-dom";

export function Header() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 bg-black flex justify-between text-white px-20 py-8 text-2xl">
        <p className="text-3xl font-bold text-green-500">🎬MovieScope</p>
        <ul className="flex gap-20 ">
          <li className="hover:bg-gray-700 hover:cursor-pointer py-1 px-3">
            Home
          </li>
          <li className="hover:bg-gray-700 hover:cursor-pointer py-1 px-3">
            Search
          </li>
          <li className="hover:bg-gray-700 hover:cursor-pointer py-1 px-3">
            Favorites
          </li>
        </ul>
      </div>
    </>
  );
}
