"use client";
import { useState } from "react";
import Link from "next/link";

export default function Signup() {

  // STATE VARIABLES
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Added for error messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify({ name, surname, username, email, password }))
    
    if (!name || !surname || !username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, username, email, password })
      });

      if (res.ok) {
        const data = await res.json();
        console.log('User created: ', data);
        alert("User successfully registered!");
        setError(""); // Clear any previous errors
      } else {
        const errorData = await res.json();
        console.log('Error:', errorData);
        setError(errorData.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <main className="bg-tree-pattern bg-cover bg-top w-full h-screen">
      <div className="flex items-center">
        <form className="flex flex-col align-center justify-center bg-[#eeffe0] p-14 pb-12 2xl:pl-40 2xl:pr-40 min-w-[50vw] h-screen" onSubmit={handleSubmit}>

          <div className="flex justify-between ">
            <h1 className="font-extrabold text-4xl pt-1">
              <Link href="/">
                Treasure Hunts
              </Link>
            </h1>
            <div>
              <button className="bg-transparent border-2 border-black text-black rounded-2xl px-3 py-2 hover:bg-black hover:text-white transition duration-300">
                <Link href="/">
                  Back to Home
                </Link>
              </button>
            </div>
          </div>
          <div className="mt-14 border-2 bg-white border-black p-10 shadow-2xl rounded-2xl">
            <h1 className="text-4xl mb-2 pt-2">
              Sign Up:
            </h1>
            <h2 className="text-lg italic mb-5">
              Your journey starts here...
            </h2>

            {error && <div className="text-red-500 mb-4">{error}</div>} {/* Error message */}

            <h1 className="text-lg text-gray-700 font-bold mb-1">
              Personal Data:
            </h1>
            <div className="pl-4 flex flex-col">
              <label>Name:</label>
              <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="border border-black rounded p-1 mb-1" />
              <label>Surname:</label>
              <input type="text" value={surname} onChange={(e) => { setSurname(e.target.value) }} className="border border-black rounded p-1 mb-1" />
            </div>

            <h1 className="text-lg text-gray-700 font-bold mt-6 mb-1">
              User Data:
            </h1>
            <div className="pl-4 flex flex-col">
              <div className="flex justify-between">
                <label>Username:</label>
                <label className=" text-gray-500 italic">Other users may know you by your username</label>
              </div>
              <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" className="border border-black rounded p-1 mb-1" />
              <label>E-mail:</label>
              <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" className="border border-black rounded p-1 mb-1" />
              <div className="flex justify-between">
                <label>Password:</label>
                <label className=" text-gray-500 italic">A password requires at least 8 symbols</label>
              </div>
              <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" className="border border-black rounded p-1 mb-1" />
            </div>

            <div className="flex justify-center mt-5">
              <button type="submit" className="text-2xl items-ce bg-green-600 w-1/4 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
                Sign Up!
              </button>
            </div>
            <div className="flex justify-center mt-5">
              <h1 className="text-center">
                Already have an account?<br />
                Log in Here!
              </h1>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
