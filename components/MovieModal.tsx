import MUiModal from "@mui/material/Modal";
import { modalState, movieState } from "./AtomModal";
import { useRecoilState } from "recoil";
import { RiCloseCircleFill, RiCreativeCommonsZeroLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { Element, Genre } from "../models/types";
import ReactPlayer from "react-player/lazy";
import { Movie } from "../models/types";
import {
  FaPlay,
  FaPlusCircle,
  FaThumbsUp,
  FaVolumeOff,
  FaVolumeUp,
} from "react-icons/fa";
import { DocumentData } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MovieModal = () => {
  // Notify when item is removed or added to list
  const notify = (message: string) => toast.success(message,{
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);
  // const [myList,setMyList] = useState([]);

  useEffect(() => {
    if (!movie) return;
    // get Movie info for modal component
    const getMovieInfo = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error.message));
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }

      if (data?.genres) {
        setGenres(data.genres);
      }
    };

    getMovieInfo();
  }, [movie]);

  const closeModal = () => {
    setShowModal(false);
  };
  // convert to only year shown
  const date: Date = new Date(movie?.release_date);
  const year = date.getFullYear();

  const saveToList = async (data: Movie | DocumentData | null) => {
    notify("Movie added to your list!");
    console.log(data);
    const response = await fetch("/api/list", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(data);
  };
  // delete from my list
  const deleteFromList = async (id: number) => {
    notify("Removed movie from your list!");
    const response = await fetch("/api/list", {
      method: "DELETE",
      body: JSON.stringify(id),
    });
    const result = await response.json();
  };

  return (
    <MUiModal
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      open={showModal}
      onClose={closeModal}
    >
      <>
        <button
          onClick={closeModal}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] "
        >
          <RiCloseCircleFill className="h-6 w-6" />
        </button>
        {/*  this padding is must for responsive design check reactplayer docs */}
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />

          <div className="absolute bottom-10 flex w-full items-center justify-between px-12">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>
              <button className="modalButton ">
                <FaPlusCircle
                  onClick={() => saveToList(movie)}
                  className=" h-7 w-7"
                />
              </button>
              <button className="modalButton">
                <FaThumbsUp className="h-7 w-7" />
              </button>
              <button
                className="h-7 w-12 bg-red-600 ml-11 "
                onClick={() => deleteFromList(movie?.id)}
              >
                Delete{" "}
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <FaVolumeOff className="h-6 w-6" />
              ) : (
                <FaVolumeUp className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-12 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-4 text-lg ">
            <div className="flex items-center space-x-6  text-sm">
              <p className=" text-xl font-bold text-white">{movie?.title}</p>
              <p className="font-light">{year || movie?.first_air_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                4K
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6 ">{movie?.overview}</p>
              <div className="flex flex-col space-y-2 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>
                  {genres.map((genre) => genre.name).join(",")}
                </div>
                <div>
                  <span className="text-[gray]">Language: </span>
                  {movie?.original_language}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </>
    </MUiModal>
  );
};
export default MovieModal;
