"use client";
import Image from "next/image";
import phone from "/public/phone.png";
import QR from "/public/QR.png";
import inter from "/public/interface.png";
import pod from "/public/podium.png";
import earth from "/public/earth.png";
import Link from "next/link";

import { useEffect } from 'react';
import { useState } from 'react';

export default function Home() {

  const [username, setUsername] = useState("")

  const handleLogout = async () => {
    const res = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await res.json();

    if (data.result === "ok") {
      window.location.reload()
    }
  }

  let guest =
  <div className="flex sm:flex-row flex-col sm:items-center justify-between">
      <h1 className="2xl:text-5xl font-caveat text-3xl sm:mb-0 mb-4 font-extrabold">
        <Link href="/">
          Treasure Hunts
        </Link>
      </h1>
      <div className="flex sm:mt-0 mt-4">
        <div className="mr-4  bg-transparent border-2 w-fit h-fit text-md border-black text-black rounded-xl p-2 hover:bg-black hover:text-white transition duration-300">
          <Link href="/login">
            Log In
          </Link>
        </div>
        <div className="bg-transparent border-2 w-fit text-md border-black text-black rounded-xl p-2 hover:bg-black hover:text-white transition duration-300">
          <Link href="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>

  let logged =
    <div className="flex sm:flex-row flex-col sm:items-center justify-between">
      <h1 className="2xl:text-6xl font-caveat text-3xl sm:mb-0 mb-4 font-extrabold">
        <Link href="/">
          Treasure Hunts
        </Link>
      </h1>
      <div className="flex items-center">
        <h1 className="text-md text-black font-bold mr-4">
          Hello, {username}.
        </h1>
        <button
          onClick={handleLogout}
          className="bg-transparent border-2 text-sm border-black text-black rounded-xl p-2 hover:bg-red-600 hover:border-red-600 hover:text-white transition duration-300"
        >
          Log out
        </button>
      </div>
    </div>

  useEffect(() => {
    const fetch_session = async () => {
      const res = await fetch('/api/session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json();

      if (data.auth == true) {
        setUsername(data.user.username)
      }
    };

    fetch_session();
  }, []);

  return (
    <main className="2xl:bg-tree-pattern bg-cover bg-top 2xl:flex w-full h-screen ">

      <div className="justify-center 2xl:bg-none bg-tree-pattern bg-cover bg-top flex flex-col 2xl:align-center 2xl:justify-center bg-[#eeffe0] p-6 xl:pr-40 xl:pl-40 pb-12 2xl:w-[50vw] 2xl:h-auto h-fit">

        {username ? (
          <>
            {logged}
          </>
        ) : (
          <>
            {guest}
          </>
        )}

        <div className="flex flex-col align-center justify-center">
          <h1 className="xl:text-6xl text-5xl mt-16 text-black 2xl:max-w-none max-w-3xl font-bold">
            Your Journey to Hidden Treasures Starts Here!
          </h1>
          <h2 className="text-black xl:text-2xl text-xl mt-10 align-center 2xl:max-w-none max-w-3xl">
            Uncover Adventure, One Clue at a Time! Solve Clues, Unlock Secrets, and Discover Hidden Treasures! Create treasure hunts and share your experiences!
          </h2>
          <button className="text-4xl w-fit mt-[5vw] font-caveat bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
            Launch Application
          </button>
          <h2 className="mt-3xl mt-4 w-3/4 xl:text-md text-black font-extralight">
            If you haven't logged in yet, you will be redirected to the log in.
          </h2>
        </div>

      </div>

      <div className="2xl:flex 2xl:bg-transparent bg-[#eeffe0] 2xl:flex-col lg:grid lg:grid-cols-2 xl:flex-row flex-col 2xl:overflow-x-hidden scroll-smooth 2xl:overflow-y-scroll 2xl:w-[50vw] pb-10">

        <div className="flex align-center justify-center 2xl:pr-20 2xl:pl-20 2xl:pb-0 2xl:pt-40 2xl:m-0 m-10 lg:mt-10 mt-0">
          <div className=" border-2 bg-white border-black 2xl:p-10 p-4 shadow-2xl rounded-2xl flex align-center xl:flex-row flex-col max-w-2xl">
            <Image
              className="w-[60%] m-auto max-h-[500px] object-contain transform scale-90 2xl:mr-6 lg:w-[40%]"
              src={phone} // Path to your image
              alt="example"
            />
            <div className=" max-w-lg flex flex-col align-center justify-center">
              <h1 className="2xl:text-5xl text-4xl text-center text-black mt-4 font-bold">
                Plan tracks, add mini-games and share your routes with everyone
              </h1>
              <h2 className="text-black text-xl text-center mt-10 align-center">
                All in one place... with the help of Quickscan codes
              </h2>
              <Image
                className="mt-12 transform bg-blend-color-[#eeffe0]"
                src={QR} // Path to your image
                alt="example"
              />
            </div>
          </div>
        </div>

        <div className="flex 2xl:pb-0 justify-center 2xl:pr-20 2xl:pl-20 2xl:pt-20 2xl:m-0 m-10">
          <div className="border-2 bg-white border-black 2xl:p-10 p-4 shadow-2xl rounded-2xl max-w-2xl ">
            <h1 className="2xl:text-6xl text-4xl mb-10 text-black text-center font-bold">
              You make the rules of the game
            </h1>
            <div className="flex 2xl:flex-row flex-col justify-around">
              <Image
                className="w-[60%] m-auto object-contain 2xl:mr-12 2xl:mb-0 mb-12"
                src={inter} // Path to your image
                alt="example"
              />
              <h2 className="text-black text-xl text-center">
                The tracks offer difficulty options such as time-gating, requirement fulfilling...
                and things can be even made harder with well thought-out minigames!
              </h2>
            </div>
            <h2 className="text-black 2xl:text-3xl text-lg 2xl:mt-20  mt-12 text-center align-center">
              Each creator decides the difficulty of their tracks. Limitless possibilities to create the most challenging of hunts.
            </h2>
          </div>
        </div>

        <div className="flex 2xl:pb-0 justify-center 2xl:pr-20 2xl:pl-20 2xl:pt-20 2xl:m-0 m-10">
          <div className="border-2 2xl:p-10 p-4 bg-white border-black shadow-2xl rounded-2xl max-w-2xl flex flex-col text-center">
            <h1 className="2xl:text-4xl text-3xl text-black font-bold">
              Challenge your friends and improve your score on your favorite hunts!
            </h1>
            <Image
              className="m-auto w-3/4 2xl:mb-0 mt-10"
              src={pod} // Path to your image
              alt="example"
            />
            <h2 className="text-black 2xl:text-2xl text-xl mt-10 text-center align-center">
              A scoreboard system keeps track of the best completion times of each hunt.
              So that the rest may know you're the best hunter out there!
            </h2>
          </div>
        </div>

        <div className="flex 2xl:pb-40 justify-center 2xl:pr-20 2xl:pl-20 2xl:pt-20 2xl:m-0 m-10">
          <div className="border-2 bg-white border-black 2xl:p-10 p-4 shadow-2xl rounded-2xl max-w-2xl flex flex-col text-center">
            <h1 className="2xl:text-5xl text-3xl mt-6 text-black font-bold mb-5">
              The globe is your playground. Let the hunt begin!
            </h1>
            <Image
              className="m-auto w-1/2 2xl:mb-0"
              src={earth} // Path to your image
              alt="example"
            />
            <h2 className="text-black text-2xl text-center align-center mt-5">
              Easily use our integrated Google Maps service to drag and drop the checkpoints that comprise your hunts
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}
