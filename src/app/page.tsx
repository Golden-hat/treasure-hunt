import Image from "next/image";
import fix from "/public/fix.png";
import phone from "/public/phone.png";
import QR from "/public/QR.png";
import dotted from "/public/dotted.png";
import inter from "/public/interface.png";
import pod from "/public/podium.png";

export default function Home() {
  return (
    <main>
      <div className="bg-tree-pattern bg-cover bg-top pb-24 bg-blend-overlay">
        <div className="flex justify-around pt-10 ">
          <h1 className="font-syncopate font-bold text-4xl ">
            TREASURE HUNTS
          </h1>
          <div>
            <button className="bg-transparent border-2 border-black text-black rounded-2xl mr-5 px-3 py-2 hover:bg-black hover:text-white transition duration-300">
              Log In
            </button>
            <button className="bg-transparent border-2 border-black text-black rounded-2xl px-3 py-2 hover:bg-black hover:text-white transition duration-300">
              Sign In
            </button>
          </div>
        </div>
        <div className="flex justify-center h-auto mt-28">
          <div className="w-full xl:w-1/4 justify-center max-w-lg">
            <h1 className="text-7xl text-white">
              Your Journey to Hidden Treasures Starts Here!
            </h1>
            <h2 className="text-white text-3xl mt-10 align-center">
              Uncover Adventure, One Clue at a Time! Solve Clues, Unlock Secrets, and Discover Hidden Treasures! Create treasure hunts and share your experiences!
            </h2>
            <button className="text-3xl mt-24 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
              Launch Application
            </button>
            <h2 className="mt-6 w-3/4 text-md text-white">
              If you haven't logged in yet, this button will launch the application with a guest account.
            </h2>
          </div>
          <Image
            className="hidden xl:block transform scale-90"
            src={fix} // Replace 'fix' with the actual image path or import
            alt="example"
          />
        </div>
      </div>
      <div className=" bg-gradient-to-b from-[#EEFFE0] via-[#EEFFE0] via-90% to-black flex text-center items-center justify-center pb-80 pt-60">
        <Image
          className="transform scale-90 mr-12"
          src={phone} // Path to your image
          alt="example"
          height={650}
        />
        <div className="max-w-lg">
          <h1 className="text-6xl text-black">
            Plan tracks, add mini-grames and share your routes with everyone
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
      <div className="bg-hero-pattern bg-cover bg-top flex justify-center pt-80 pb-80">
        <div className="justify-center max-w-4xl">
          <h1 className="text-8xl mb-10 text-white text-center">
            The globe is your playground. Let the hunt begin!
          </h1>
          <h2 className="text-white text-3xl mb-40 text-center align-center">
            Easily use our integrated Google Maps service to drag and drop the checkpoints that comprise your hunts
          </h2>
        </div>
      </div>
      <div className="relative bg-mirror-pattern bg-cover bg-top flex justify-center pt-80 pb-96">
        <div className="justify-center max-w-7xl">
          <h1 className="text-8xl mb-10 text-white text-center">
            You make the rules of the game
          </h1>
          <div className="flex justify-around">
            <Image
              className="m-auto mt-20 mr-40 -rotate-2"
              src={inter} // Path to your image
              alt="example"
            />
            <h2 className="text-white text-4xl mt-24 rotate-2 text-center">
              The tracks offer difficulty options such as time-gating, requirement fulfilling...<br></br> <br></br>
              and things can be even made harder with well thought-out minigames!
            </h2>
          </div>
          <h2 className="text-white text-3xl mt-20 text-center align-center">
            Each creator decides the difficulty of their tracks. Limitless possibilities to create the most challenging of hunts.
          </h2>
        </div>
      </div>
      <div className=" bg-gradient-to-b from-[#EEFFE0] via-[#EEFFE0] via-95% to-black flex text-center items-center justify-center pb-80 pt-20">
        <div className="max-w-6xl flex flex-col text-center">
          <h1 className="text-7xl text-black">
            Challenge your friends and improve your score on your favorite hunts!
          </h1>
          <Image
            className="m-auto mt-20 mr-40 w-3/4"
            src={pod} // Path to your image
            alt="example"
          />
          <h2 className="text-black text-3xl mt-20 text-center align-center">
            A scoreboard system keeps track of the best completion times of each hunt.
            So that the rest may know you’re the best hunter out there!
          </h2>
        </div>
      </div>
    </main>
  );
}
