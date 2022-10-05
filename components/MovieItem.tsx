import Image from "next/image";
import { useRecoilState } from "recoil";
import { Movie } from "../models/types";
import { modalState, movieState } from "./AtomModal";

interface Props {
  movie: Movie;
}

const MovieItem = ({ movie }: Props) => {
  const [showModal,setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
      className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className=""
        layout="fill"
      />
      <p className=" text-shadow-lg z-10 absolute top-0 bottom-0 rounded mx-2 text-xl p-2 font-bold">{movie.title}</p>
    </div>
  );
};

export default MovieItem;
