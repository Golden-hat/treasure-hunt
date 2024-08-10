import Image from "next/image";
import fix from "/public/fix.png";
import phone from "/public/phone.png";
import QR from "/public/QR.png";
import dotted from "/public/dotted.png";
import inter from "/public/interface.png";
import pod from "/public/podium.png";
import Link from "next/link";

export default function Login() {
  return (
    <main className="bg-tree-pattern bg-cover bg-top w-full h-screen">
      <div className="flex items-center">
        <form className="flex flex-col align-center justify-center bg-white p-14 pb-12 pl-40 pr-40 min-w-[50vw] h-screen">

        <div className="flex justify-between ">
          <h1 className="font-syncopate font-bold text-4xl pt-1">
            Treasure Hunts
          </h1>
          <div>
            <button className="bg-transparent border-2 border-black text-black rounded-2xl px-3 py-2 hover:bg-black hover:text-white transition duration-300">
              Back to front page
            </button>
          </div>
        </div>
        <div className="flex flex-col mt-14 border-2 bg-white border-black p-10 shadow-2xl rounded-2xl">
        <h1 className="text-5xl mb-2">
            Log in:
          </h1>
          <h2 className="text-xl italic mb-5">
            Welcome back, hunter.
          </h2>
  
          <label>E-mail:</label>
          <input type="text" className="border border-black rounded p-1 mb-2" />
          <label>Password:</label>
          <input type="text" className="border border-black rounded p-1 mb-2" />
          <div className="flex">
              <input type="checkbox" className="p"></input>
              <label className="pl-2 text-gray-500 italic text-sm mt-1">Remember me</label>
            </div>
          <div className="flex justify-center mt-5">
            <button className="text-2xl items-ce bg-green-600 w-1/4 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
              Log in!
            </button>
          </div>
          <div className="flex justify-center mt-5">
            <h1 className="text-center">
              Don't have an account yet?<br />
              Sign Up!
            </h1>
          </div>
          </div>
        </form>
      </div>
    </main>
  );
}