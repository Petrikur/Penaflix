import Head from "next/head";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MovieItem from "../components/MovieItem";
import MovieModal from "../components/MovieModal";
import { Movie } from "../models/types";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, movieState } from "../components/AtomModal";
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

interface MongoMovie {
  mylist: Movie[];
}
const MyList = (props:MongoMovie) => {
  console.log(typeof props.mylist);
  const showModal = useRecoilValue(modalState);
  const [list, setList] = useState(props.mylist);
  console.log(list);
  console.log(props.mylist);

  // useEffect(() => {
  //   setList(props.mylist)
  // },[list])

  return (
    <>
      <div>
        <Head>
          <title>Penaflix Search</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        {/* Search bar  */}
        <div className=" grid grid-cols-2 my-36 gap-4 mx-5 lg:grid-cols-5 md:grid-cols-3 ">
          {list.map((movie: Movie, index: number) => (
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

export default MyList;

export const getServerSideProps = async () => {
  let myList = [];

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zyfh5of.mongodb.net/mylist?retryWrites=true&w=majority`
  );
  const db = client.db();
  const myListColl = db.collection("mylist");

  myList = await myListColl.find().toArray();

  client.close();

  return {
    props: {
      mylist: JSON.parse(JSON.stringify(myList)),
    },
  };
};
