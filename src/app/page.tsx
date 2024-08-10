import Image from "next/image";
import fix from "/public/fix.png";
import phone from "/public/phone.png";
import QR from "/public/QR.png";
import dotted from "/public/dotted.png";
import inter from "/public/interface.png";
import pod from "/public/podium.png";

export default function Home() {
  return (
    <main className="bg-tree-pattern bg-cover bg-top flex w-full h-screen">
      <div className="flex flex-col align-center justify-center bg-white p-14 pr-40 pl-40 pb-12 max-w-[50vw] h-screen">

        <div className="flex justify-between">
          <h1 className="font-syncopate font-bold text-4xl pt-1">
            Treasure Hunts
          </h1>
          <div>
            <button className="bg-transparent border-2 border-black text-black mr-5 rounded-2xl px-3 py-2 hover:bg-black hover:text-white transition duration-300">
              Log in
            </button>
            <button className="bg-transparent border-2 border-black text-black rounded-2xl px-3 py-2 hover:bg-black hover:text-white transition duration-300">
              Sign Up
            </button>
          </div>
        </div>
      
        <div className="flex flex-col align-center justify-center">
          <h1 className="text-[3.5vw] mt-[3vw] text-black">
            Your Journey to Hidden Treasures Starts Here!
          </h1>
          <h2 className="text-black text-[1.5vw] mt-10 align-center">
            Uncover Adventure, One Clue at a Time! Solve Clues, Unlock Secrets, and Discover Hidden Treasures! Create treasure hunts and share your experiences!
          </h2>
          <button className="text-[2vw] max-w-[20vw] mt-[5vw] bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
            Launch Application
          </button>
          <h2 className="mt-[2vw] w-3/4 text-[1.1vw] text-black">
            If you haven't logged in yet, you will be redirected to the log in.
          </h2>
        </div>
      </div>

      <div className="flex flex-col overflow-x-hidden scroll-smooth overflow-y-scroll ">
        <div className="flex align-center justify-center pr-20 pl-20 pb-40 pt-40">
          <div className="-rotate-1 border-2 bg-white border-black p-10 shadow-2xl rounded-[5%] flex flex-row max-w-2xl">
            <Image
              className="w-[60%] h-auto max-h-[500px] object-contain transform scale-90 mr-12"
              src={phone} // Path to your image
              alt="example"
            />
            <div className=" max-w-lg flex flex-col align-center justify-center">
              <h1 className="text-5xl text-center text-black ">
                Plan tracks, add mini-games and share your routes with everyone
              </h1>
              <h2 className="text-black text-xl text-center mt-10 align-center">
                All in one place... with the help of Quickscan codes
              </h2>
              <Image
                className="mt-12 transform scale-90 bg-blend-color-[#eeffe0]"
                src={QR} // Path to your image
                alt="example"
              />
            </div>
          </div>
        </div>

        <div className="w-[50vw] relative flex justify-center pt-40 pb-60">
          <div className="rotate-1 border-2 bg-white border-black p-10 shadow-2xl rounded-[5%] justify-center max-w-2xl">
            <h1 className="text-7xl mb-10 text-black text-center">
              You make the rules of the game
            </h1>
            <div className="flex justify-around">
              <Image
                className="w-[60%] h-auto max-h-[500px] object-contain transform scale-90 mr-12"
                src={inter} // Path to your image
                alt="example"
              />
              <h2 className="text-black text-xl rotate-2 text-center">
                The tracks offer difficulty options such as time-gating, requirement fulfilling...<br></br> <br></br>
                and things can be even made harder with well thought-out minigames!
              </h2>
            </div>
            <h2 className="text-black text-3xl mt-20 text-center align-center">
              Each creator decides the difficulty of their tracks. Limitless possibilities to create the most challenging of hunts.
            </h2>
          </div>
        </div>

        <div className="w-[50vw] flex text-center items-center justify-center pb-40 pt-20">
          <div className=" -rotate-1 border-2 bg-white border-black p-10 shadow-2xl rounded-[5%] max-w-2xl flex flex-col text-center">
            <h1 className="text-5xl text-black">
              Challenge your friends and improve your score on your favorite hunts!
            </h1>
            <Image
              className="m-auto mt-20 w-3/4"
              src={pod} // Path to your image
              alt="example"
            />
            <h2 className="text-black text-2xl mt-20 text-center align-center">
              A scoreboard system keeps track of the best completion times of each hunt.
              So that the rest may know you're the best hunter out there!
            </h2>
          </div>
        </div>

        <div className="flex flex-row align-center justify-center p-40 w-full h-max-1/2-screen">
          <div className="rotate-1 border-2 bg-white border-black p-10 shadow-2xl rounded-[5%] justify-center mb-32 max-w-2xl">
            <h1 className="text-6xl mt-10 mb-20 text-black text-center">
              The globe is your playground. Let the hunt begin!
            </h1>
            <h2 className="text-black text-2xl text-center align-center">
              Easily use our integrated Google Maps service to drag and drop the checkpoints that comprise your hunts
            </h2>
          </div>
        </div>

      </div>


    </main>
  );
}
