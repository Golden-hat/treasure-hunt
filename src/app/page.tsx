import Image from "next/image";
import fix from "/public/fix.png";
import phone from "/public/phone.png";
import QR from "/public/QR.png";
import dotted from "/public/dotted.png";
import inter from "/public/interface.png";
import pod from "/public/podium.png";
import earth from "/public/earth.png";

export default function Home() {
  return (
    <main className="bg-tree-pattern bg-cover bg-top 2xl:flex w-full h-screen">

      <div className="flex flex-col 2xl:align-center 2xl:justify-center bg-white p-14 xl:pr-40 xl:pl-40 pb-12 2xl:w-[50vw] 2xl:h-auto h-[40rem]">

        <div className="flex justify-between">
          <h1 className="font-syncopate font-bold 2xl:text-4xl text-xl 2xl:pt-1">
            Treasure Hunts
          </h1>
          <div>
            <button className="bg-transparent border-2 border-black 2xl:text-xl text-sm text-black 2xl:mr-5 mr-2 rounded-2xl 2xl:px-3 px-2 2xl:py-2 hover:bg-black hover:text-white transition duration-300">
              Log in
            </button>
            <button className="bg-transparent border-2 border-black 2xl:text-xl text-sm text-black rounded-2xl 2xl:px-3 px-2 2xl:py-2 hover:bg-black hover:text-white transition duration-300">
              Sign Up
            </button>
          </div>
        </div>
      
        <div className="flex flex-col align-center justify-center">
          <h1 className="xl:text-6xl text-5xl mt-16 text-black 2xl:max-w-none max-w-3xl">
            Your Journey to Hidden Treasures Starts Here!
          </h1>
          <h2 className="text-black xl:text-2xl text-xl mt-10 align-center 2xl:max-w-none max-w-3xl">
            Uncover Adventure, One Clue at a Time! Solve Clues, Unlock Secrets, and Discover Hidden Treasures! Create treasure hunts and share your experiences!
          </h2>
          <button className="text-3xl w-fit mt-[5vw] bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
            Launch Application
          </button>
          <h2 className="mt-3xl mt-4 w-3/4 xl:text-xl text-black">
            If you haven't logged in yet, you will be redirected to the log in.
          </h2>
        </div>

      </div>

      <div className="flex 2xl:bg-none bg-tree-pattern bg-cover flex-col 2xl:overflow-x-hidden scroll-smooth 2xl:overflow-y-scroll 2xl:w-[50vw]">

        <div className="flex align-center justify-center 2xl:pr-20 2xl:pl-20 2xl:pb-0 2xl:pt-40 2xl:m-0 m-10">
          <div className="-rotate-1 border-2 bg-white border-black p-10 shadow-2xl rounded-2xl flex align-center 2xl:flex-row flex-col max-w-2xl">
            <Image
              className="w-[60%] m-auto max-h-[500px] object-contain transform scale-90 2xl:mr-6"
              src={phone} // Path to your image
              alt="example"
            />
            <div className=" max-w-lg flex flex-col align-center justify-center">
              <h1 className="2xl:text-5xl text-4xl text-center text-black mt-4">
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
          <div className="2xl:rotate-1 border-2 bg-white border-black p-10 shadow-2xl rounded-2xl max-w-2xl">
            <h1 className="2xl:text-7xl text-4xl mb-10 text-black text-center">
              You make the rules of the game
            </h1>
            <div className="flex 2xl:flex-row flex-col justify-around">
              <Image
                className="w-[50%] m-auto object-contain 2xl:mr-12 2xl:mb-0 mb-12"
                src={inter} // Path to your image
                alt="example"
              />
              <h2 className="text-black text-xl 2xl:rotate-2 text-center">
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
          <div className=" -rotate-1 border-2 bg-white border-black p-10 shadow-2xl rounded-2xl max-w-2xl flex flex-col text-center">
            <h1 className="2xl:text-5xl text-3xl text-black">
              Challenge your friends and improve your score on your favorite hunts!
            </h1>
            <Image
              className="m-auto 2xl:mb-0 mt-10"
              src={pod} // Path to your image
              alt="example"
            />
            <h2 className="text-black 2xl:text-2xl text-xl 2xl:mt-20 mt-10 text-center align-center">
              A scoreboard system keeps track of the best completion times of each hunt.
              So that the rest may know you're the best hunter out there!
            </h2>
          </div>
        </div>

        <div className="flex 2xl:pb-0 justify-center 2xl:pr-20 2xl:pl-20 2xl:pt-20 2xl:m-0 m-10">
          <div className="rotate-1 border-2 bg-white border-black p-10 shadow-2xl rounded-2xl justify-center mb-32 max-w-2xl">
            <h1 className="text-5xl mt-6 text-black text-center">
              The globe is your playground. Let the hunt begin!
            </h1>
            <Image
              className="m-auto w-1/2 2xl:mb-0"
              src={earth} // Path to your image
              alt="example"
            />
            <h2 className="text-black text-2xl text-center align-center">
              Easily use our integrated Google Maps service to drag and drop the checkpoints that comprise your hunts
            </h2>
          </div>
        </div>

      </div>

    </main>
  );
}
