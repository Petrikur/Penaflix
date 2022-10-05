import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import backgroundImage from "../components/Images/movietheatre.jpg";
import penaflixImage from "../components/Images/penaflix.png";
import useAuth from "../customhooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
  
    if (login) {
      await signIn(data.email, data.password);
    } else {
      await signUp(data.email, data.password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Penaflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src={backgroundImage}
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src={penaflixImage.src}
        alt=""
        width={200}
        height={200}
        className="absolute cursor-pointer object-contain md:left-10 md:top-6"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w md:max-w-md md:px-14 "
      >
        {" "}
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full ">
            <input
              type="email"
              placeholder="Email"
              className="input"
              value = {"test1@test.com  "}
              {...register("email", { required: true })}
              // {...errors.email && <p>This field is required</p>}
            />{" "}
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>

          <label className="inline-block w-full ">
            <input
                value = {"test123"}
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="input"
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        {/* Login button */}
        <button
          onClick={() => {
            setLogin(true);
          }}
          className="w-full rounded bg-[#e50914] font-semibold py-3"
        >
          Sign In
        </button>
        <div className="text-[gray]">
          {" "}
          New to Penaflix?  {/* Register button  */}
          <button
            onClick={() => setLogin(false)}
            className="text-white hover:underline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
