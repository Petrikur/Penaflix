import React from "react";
import Image from "next/image";
import backgroundImage from "../components/Images/movietheatre.jpg";
import Header from "../components/Header";

import Link from "next/link";

const About = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Header />
      <Image
        src={backgroundImage}
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />

      <div className="space-y-4 flex flex-col items-center ">
        <p className="text-2xl font-semibold">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
        <p>All movie data, images, trailers and texts are provided by </p>
        <a
          className="bg-white rounded relative  py-3 px-4 text-black font-bold"
          target="_blank"
          href="https://www.themoviedb.org/"
        >
          Themoviedb
       </a>
      </div>
    </div>
  );
};

export default About;
