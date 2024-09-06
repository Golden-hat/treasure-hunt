"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();

  // STATE VARIABLES
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify({ name, surname, username, email, password }))
    setLoading(true)

    if (!name || !surname || !username || !email || !password) {
      alert("All fields are required.");
      setLoading(false)
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

      const data = await res.json();
      if (data.result == "ok") {
        console.log('User created: ', data);
        alert("User successfully registered!");
        router.push("/login")
      }
      else {
        const errorData = await res.json();
        console.log('Error:', errorData);
        setLoading(false)
      }

    } catch (error) {
      console.error('An error occurred:', error);
      setLoading(false)
      alert("An error occurred. These credentials may already be in use.");
    }
  }

  return (
    <main className="min-h-screen bg-tree-pattern bg-cover bg-top flex flex-col items-center justify-center">
      <form className="flex max-w-[600px] w-full flex-col justify-center px-4" onSubmit={handleSubmit}>
        <div className="flex sm:flex-row flex-col justify-between mb-8 mt-14">
          <h1 className="font-extrabold text-4xl pt-1">
            <h1 className="font-caveat text-4xl font-extrabold">
              Treasure Hunts
            </h1>
          </h1>
          <div className="mt-4 sm:mt-0">
            <div className="bg-transparent border-2 w-fit text-sm border-black text-black rounded-2xl px-3 py-2 hover:bg-black hover:text-white transition duration-300">
              <Link href="/">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        <div className=" mb-14 border-2 bg-white border-black p-10 shadow-2xl rounded-2xl">

          <h1 className="text-3xl font-bold">
            Sign Up:
          </h1>
          <h2 className="mt-2 mb-6">
            Your journey starts here...
          </h2>

          <h1 className="text-lg text-gray-700 font-bold mb-1">
            Personal Data:
          </h1>
          <div className="flex flex-col">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="border border-black rounded p-1 mb-1" />
            <label>Surname:</label>
            <input type="text" value={surname} onChange={(e) => { setSurname(e.target.value) }} className="border border-black rounded p-1 mb-1" />
          </div>

          <h1 className="text-lg text-gray-700 font-bold mt-6 mb-1">
            User Data:
          </h1>
          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row justify-between">
              <label>Username:</label>
              <label className="text-gray-500 text-sm italic mb-2 lg:mb-0">Other users may know you by your username</label>
            </div>
            <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" className="border border-black rounded p-1 mb-1" />
            <label className="mb-2">E-mail:</label>
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" className="border border-black rounded p-1 mb-1" />
            <div className="flex flex-col lg:flex-row justify-between">
              <label>Password:</label>
              <label className="text-gray-500 text-sm mb-2 italic lg:mb-0">A password requires at least 8 symbols</label>
            </div>
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" className="border border-black rounded p-1 mb-1" />
          </div>

          <div className="flex justify-center mt-5">
            <button type="submit" className="flex justify-center align-center w-full items-center text-2xl bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
              {loading ? <div className="spinner"></div> : "Sign up!"}
            </button>
          </div>
          <div className="flex justify-center mt-5">
            <h1 className="text-center">
              Already have an account?<br />
              <Link href="/login" className="text-blue-800 underline">
                Log In!
              </Link>
            </h1>
          </div>
        </div>
      </form>
    </main>

  );
}
