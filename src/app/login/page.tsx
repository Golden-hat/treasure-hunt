"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(""); // Added for error messages
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const fetch_session = async () => {
      const res = await fetch('/api/session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json();

      if(data.auth == true) {
        router.push("/")
        alert("You're already logged in with a user. You should first log out.")
      }
    };

    fetch_session();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify({ email, password, remember }))

    if (!email || !password) {
      setError("All fields are required.");
      return
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, remember })
      });

      const data = await res.json();
      if (data.result == "ok") {
        alert("User successfully found!");
        setError(""); // Clear any previous errors
      }
      else if (data.result == "ko") {
        alert("It seems you haven't signed up. No such credentials found in database.");
        setError("Please try again. Make sure you have previously signed in.");
        setError(""); // Clear any previous errors
        setEmail(""); setPassword("");
      }
      else if (data.result == "wrong") {
        alert("Invalid password. Try again.");
        setError("Please try again.");
        setError(""); // Clear any previous errors
        setEmail(""); setPassword("");
      }
      else {
        setError("An error occurred. Please try again.");
        setEmail(""); setPassword("");
      }

    } catch (error) {
      console.error('An error occurred:', error);
      alert("An error occurred. Check your credentials.");
    }
  }

  return (
    <main className="bg-tree-pattern bg-cover bg-top w-full h-screen">
      <div className="flex items-center">
        <form className="flex flex-col align-center justify-center bg-[#eeffe0] p-14 pb-12 2xl:pl-40 2xl:pr-40 min-w-[50vw] h-screen">

          <div className="flex justify-between ">
            <h1 className="font-syncopate font-extrabold text-4xl pt-1">
              Treasure Hunts
            </h1>
            <div>
              <button className="bg-transparent border-2 border-black text-black rounded-2xl px-3 py-2 hover:bg-black hover:text-white transition duration-300">
                <Link href="/">
                  Back to Home
                </Link>
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

            {error && <div className="text-red-500 mb-4">{error}</div>} {/* Error message */}

            <label>E-mail:</label>
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" className="border border-black rounded p-1 mb-2" />
            <label>Password:</label>
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" className="border border-black rounded p-1 mb-2" />
            <div className="flex">
              <input type="checkbox" onChange={(e) => { console.log(remember); setRemember(e.target.checked); }} className="p"></input>
              <label className="pl-2 text-gray-500 text-sm">Remember me</label>
            </div>
            <div className="flex justify-center mt-5">
              <button onClick={handleSubmit} className="text-2xl items-ce bg-green-600 w-1/4 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
                Log in!
              </button>
            </div>
            <div className="flex justify-center mt-5">
              <h1 className="text-center">
                Don't have an account yet?<br />
                <Link href="/signup" className="text-blue-800 underline ">
                  Sign Up!
                </Link>
              </h1>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}