"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

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
        router.push("/")
        alert("You're already logged in with a user. You should first log out.")
      }
    };

    fetch_session();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify({ email, password, remember }))
    setLoading(true)

    if (!email || !password) {
      alert("All fields are required.")
      setLoading(false)
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
      }
      else if (data.result == "ko") {
        alert("It seems you haven't signed up. No such credentials found in database.");
        setLoading(false)
        setEmail(""); setPassword("");
      }
      else if (data.result == "wrong") {
        alert("Invalid password. Try again.");
        setLoading(false)
        setEmail(""); setPassword("");
      }
      else {
        setEmail(""); setPassword("");
      }

    } catch (error) {
      console.error('An error occurred:', error);
      alert("An error occurred. Check your credentials.");
    }
  }

  return (
    <main className="bg-tree-pattern bg-cover bg-full min-h-screen flex justify-center items-center overflow-x-hidden">
      <form className="flex max-w-[600px] w-full flex-col justify-center px-4 mb-14" onSubmit={handleSubmit}>
        <div className="flex sm:flex-row flex-col justify-between mb-8 mt-14">
          <div className="font-extrabold text-4xl pt-1">
            <h1 className=" text-4xl font-caveat font-extrabold">
              Treasure Hunts
            </h1>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="bg-transparent border-2 w-fit text-sm border-black text-black rounded-2xl px-3 py-2 hover:bg-black hover:text-white transition duration-300">
              <Link href="/">
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full border-2 bg-white border-black p-8 shadow-2xl rounded-2xl">
          <h1 className="text-4xl font-bold mb-2">
            Log In:
          </h1>
          <h2 className="text-md mb-6">
            Welcome back, hunter.
          </h2>


          <label className="font-semibold">E-mail:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="border border-black rounded p-2 mb-4 w-full"
          />
          <label className="font-semibold">Password:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border border-black rounded p-2 mb-4 w-full"
          />

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="mr-2"
            />
            <label onClick={() => setRemember(!remember)} className="select-none text-gray-500 text-sm">Remember me</label>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="flex align-center justify-center w-full items-center bg-green-600 text-white text-2xl py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          >
            {loading ? <div className="spinner"></div> : "Log In!"}
          </button>

          <div className="text-center mt-6">
            <p>Don't have an account yet?</p>
            <Link href="/signup" className="text-blue-800 underline">
              Sign Up!
            </Link>
          </div>
        </div>
      </form>
    </main>

  );
}