import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav>
        <div className="fixed top-0 left-0 right-0 z-10 flex lg:flex-row justify-between text-white px-5 md:px-15 py-1 text-2xl bg-black">
          <p className="lg:text-3xl text-2xl font-bold text-green-500">
            🎬MovieScope
          </p>

          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="md:hidden hover:cursor-pointer"
          >
            {isOpen ? "✖" : "☰"}
          </button>

          <ul className="hidden md:flex md:flex-row gap-20 md:gap-5">
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

        <div
          className={`md:hidden flex flex-col items-center gap-6 text-white text-xl transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "mt-10 max-h-60 opacity-100" : "max-h-0 opacity-0"
          } `}
        >
          <ul>
            <li>
              <Link
                to={"/"}
                onClick={() => {
                  setIsOpen(false);
                }}
                className="hover:bg-gray-700 hover:cursor-pointer "
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/Search"}
                onClick={() => {
                  setIsOpen(false);
                }}
                className="hover:bg-gray-700 hover:cursor-pointer "
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to={"/Favorites"}
                onClick={() => {
                  setIsOpen(false);
                }}
                className="hover:bg-gray-700 hover:cursor-pointer "
              >
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
