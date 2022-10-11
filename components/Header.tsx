import React, { useEffect, useState,forwardRef } from "react";
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
        <a href="https://www.themoviedb.org/" >
        <img
          src={
            "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          }
          width={100}
          height={100}
          className="cursor-pointer object-contain"
          
        /></a>
        <ul className="hidden space-x-4 md:flex">
          <Link
            className="headerLink cursor-pointer font-semibold text-white hover:text-white"
            href={"/"}
          >
            Home
          </Link>
          <li className="headerLink">Series</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New</li>
          <li className="headerLink">My list</li>
          <Link
            className="headerLink cursor-pointer font-semibold text-white hover:text-white"
            href={"/about"}
          >
            About
          </Link> 
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
      <Link href={"/search"}><FaSearch className="sm hidden h-6 w-6 sm:inline cursor-pointer hover:bg-[gray]/70 rounded " /></Link>

        <FaBell className="sm hidden h-6 w-6 sm:inline" />

        <button className="hover:bg-black rounded px-5 py-2 " onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
