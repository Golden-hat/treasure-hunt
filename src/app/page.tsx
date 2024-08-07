import Image from "next/image";
import fix from "/public/fix.png"

export default function Home() {
  return (
    <main className="bg-[url('/trees.png')] bg-cover bg-center">
      <div className="flex justify-around p-10">
        <h1 className="font-syncopate font-bold text-4xl">
          TREASURE HUNTS
        </h1>
        <div>
          <button className="bg-transparent border-2 border-black text-black rounded-2xl mr-5 px-3 py-2 hover:bg-black hover:text-white transition duration-300">
            Log In
          </button>
          <button className="bg-transparent border-2 border-black text-black rounded-2xl px-3 py-2 hover:bg-black hover:text-white transition duration-300">
            Sign Out
          </button>
        </div>
      </div>
      <div className="flex justify-center h-auto">
        <div className="w-1/4 ml-20 mt-40 justify-center">
          <h1 className="text-7xl text-white">
            Your Jorney to Hidden Treasures starts Here!
          </h1>
          <h2 className="text-white text-xl mt-10 align-center">
            Uncover Adventure, One Clue at a Time! Solve Clues, Unlock Secrets, and Discover Hidden Treasures!  Create treasure hunts and share your experiences!
          </h2>
          <button className="text-3xl mt-10 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
            Launch Application
          </button>
          <h2 className="mt-2 text-white">
            If you haven't logged in yet, this button will launch the application with a guest account.
          </h2>
        </div>
        <Image
          className="mb-20 mt-20 transform scale-90"
          src={fix} // Path to your image
          alt="rising hands and fall"
        />
      </div>
    </main>
  );
}
