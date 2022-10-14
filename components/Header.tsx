import React, { useEffect, useState, forwardRef } from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import penaflixImage from "./Images/penaflix.png";
import useAuth from "../customhooks/useAuth";
import Link from "next/link";

const Header = () => {
  const [isScrolling, setisScrolling] = useState(false);
  const { logout } = useAuth();
  // if scrolling, animate the navbar
  useEffect(() => {
    const handleScoll = () => {
      if (window.scrollY > 0) {
        setisScrolling(true);
      } else {
        setisScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScoll);

    // cleanup function
    return () => {
      window.removeEventListener("scroll", handleScoll);
    };
  }, []);

  return (
    <header className={`${isScrolling && "bg-[#141414d8]"}`}>
      
      <div className=" flex items-center space-x-2 md:space-x-10">
        <Link href="/">
          <img
            src={penaflixImage.src}
            width={100}
            height={100}
            className="cursor-pointer object-contain "
          />
        </Link>
        <a href="https://www.themoviedb.org/">
          <img
            src={
              "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
            }
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </a>
        <ul className="hidden space-x-6 md:flex">
          <Link href={"/"}>
            <a className="headerLink cursor-pointer font-semibold text-white hover:text-red-700 hover:scale-125">
              Home
            </a>
          </Link>

          <Link href={"/about"}>
            <a className="headerLink cursor-pointer font-semibold text-white hover:text-red-700">
              About
            </a>
          </Link>
          <Link href={"/search"}>
            <a className="headerLink cursor-pointer font-semibold text-white hover:text-red-700">
              Search
            </a>
          </Link>
          <Link href={"/mylist"}>
            <a className="headerLink cursor-pointer font-semibold text-white hover:text-red-700">
              My List
            </a>
          </Link>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        {/* <Link href={"/search"}><FaSearch className="sm hidden h-6 w-6 sm:inline cursor-pointer hover:bg-[gray]/70 rounded " /></Link> */}

        <FaBell className="sm hidden h-6 w-6 sm:inline" />

        <button className="rounded px-5 py-2 hover:scale-125 hover:text-red-500 font-bold" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
