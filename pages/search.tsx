import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Movie } from "../models/types";
import MovieItem from "../components/MovieItem";
import { modalState, movieState } from "../components/AtomModal";
import requests from "../utilities/requests";
import Head from "next/head";
import MovieModal from "../components/MovieModal";
import { useRecoilState, useRecoilValue } from "recoil";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
}

const Search = (props: Props) => {
  // const [showModal,setShowModal] = useRecoilState(modalState)
  // const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [searchResults, setSearchResults]: any[] = useState([]);
  const [notSearching, setNotSearching] = useState(true);
  const showModal = useRecoilValue(modalState);
  const [allMovies, setAllMovies] = useState(
    props.netflixOriginals.concat(
      props.actionMovies,
      props.comedyMovies,
      props.horrorMovies,
      props.topRated,
      props.trendingNow
    )
  );

  

  useEffect(() => {
    const getRidOfDuplicates = (movies: Movie[]) => {
      let removed = movies.filter(
        (movie, index) =>
          index === movies.findIndex((elem) => elem.id === movie.id)
      );
     console.log(removed)
      setSearchResults(removed);
    };

    getRidOfDuplicates(allMovies);
    // setSearchResults(allMovies);
  }, []);

  const onChangeHandler = (event: any) => {
    if (event.target.value == "") {
      // setSearchResults([]);
      setNotSearching(true);
    }
    setNotSearching(false);
    const filteredResults = allMovies.filter(
      (movie) =>
        movie.title != undefined &&
        movie.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <>
      <div>
        <Head>
          <title>Penaflix Search</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        {/* Search bar  */}
        <form className="relative top-28 mx-5">
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none ">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </div>
            <input
              onChange={onChangeHandler}
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Movies..."
            />
            {/* <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button> */}
          </div>
        </form>
        <div className="FilteredMovies">
          <div className="group relative md:-ml-2">
            {/* <div
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
          ref={rowRef}
        > */}
            {/* <div className="flex flex-wrap absolute top-48 ml-5 mr-5 space-x-2 space-y-1">
              {notSearching &&
                allMovies.map((movie) => (
                  <MovieItem key={movie.id} movie={movie} />
                ))}
            </div> */}
          </div>
        </div>
        <div className=" grid grid-cols-2 my-36 gap-4 mx-5 lg:grid-cols-5 md:grid-cols-3 ">
          {searchResults.map((movie: Movie, index: number) => (
            <MovieItem key={index} movie={movie} />
          ))}
        </div>
        )
      </div>
      {showModal && <MovieModal />}
      {/* </div> */}
    </>
  );
};

export default Search;
export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
    },
  };
};
