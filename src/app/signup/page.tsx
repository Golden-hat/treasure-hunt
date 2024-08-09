import Image from "next/image";
import fix from "/public/fix.png";
import phone from "/public/phone.png";
import QR from "/public/QR.png";
import dotted from "/public/dotted.png";
import inter from "/public/interface.png";
import pod from "/public/podium.png";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-tree-pattern bg-cover bg-top w-full h-screen">
      <div className="flex items-center">
        <form className="flex flex-col bg-white p-14 pb-12 pl-40 pr-40 min-w-[50vw] h-screen">

        <div className="flex justify-between ">
          <h1 className="font-syncopate font-bold text-4xl ">
            Treasure Hunts
          </h1>
          <div>
            <button className="bg-transparent border-2 border-black text-black rounded-2xl px-3 py-2 hover:bg-black hover:text-white transition duration-300">
              Back to front page
            </button>
          </div>
        </div>

          <h1 className="text-6xl mb-2 pt-14">
            Sign Up:
          </h1>
          <h2 className="text-xl italic mb-10">
            Your journey starts here...
          </h2>

          <h1 className="text-xl text-gray-700 font-bold mb-3">
            Personal Data:
          </h1>
          <div className="pl-4 flex flex-col">
            <label>Name:</label>
            <input type="text" className="border border-black rounded p-1 mb-2" />
            <label>Surname:</label>
            <input type="text" className="border border-black rounded p-1 mb-2" />
          </div>

          <h1 className="text-xl text-gray-700 font-bold mt-6 mb-3">
            User Data:
          </h1>
          <div className="pl-4 flex flex-col">
            <div className="flex justify-between">
              <label>Username:</label>
              <label className=" text-gray-500 italic">Other users may know you by your username</label>
            </div>
            <input type="text" className="border border-black rounded p-1 mb-2" />
            <label>E-mail:</label>
            <input type="text" className="border border-black rounded p-1 mb-2" />
            <div className="flex justify-between">
              <label>Password:</label>
              <label className=" text-gray-500 italic">A password requires at least 8 symbols</label>
            </div>
            <input type="text" className="border border-black rounded p-1 mb-2" />
          </div>

          <div className="flex justify-center mt-5">
            <button className="text-2xl items-ce bg-green-600 w-1/4 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
              Sign Up!
            </button>
          </div>
          <div className="flex justify-center mt-5">
            <h1 className="text-center">
              Already have an account?<br />
              Log in Here!
            </h1>
          </div>
        </form>
      </div>
    </main>
  );
}