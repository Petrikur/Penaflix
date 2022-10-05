import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import requests from "../utilities/requests";
import { Movie } from "../models/types";
import MoviesRow from "../components/MoviesRow";
import useAuth from "../customhooks/useAuth";
import MovieModal from "../components/MovieModal";
import { modalState } from "../components/AtomModal";
import { useRecoilValue } from "recoil";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
}

const Home = (props: Props) => {
  const { logout, loading } = useAuth();
  const showModal = useRecoilValue(modalState);

  if (loading) {
    return null; // Todo add loading spinner
  }

  return (
    // header is fixed so relative
    <div className="relative h-screen bg-gradient-to-b from-gray-400/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Penaflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
        <Banner netflixOriginals={props.netflixOriginals} />
        <section className="md:space-y-24">
          <MoviesRow title="Originals " movies={props.netflixOriginals} />
          <MoviesRow title="Trending now" movies={props.trendingNow} />
          <MoviesRow title="Top rated" movies={props.topRated} />
          <MoviesRow title="Action" movies={props.actionMovies} />
          <MoviesRow title="Comedy" movies={props.comedyMovies} />
          <MoviesRow title="Horror" movies={props.horrorMovies} />
        </section>
      </main>
      {showModal && <MovieModal />}
    </div>
  );
};

export default Home;

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
