"use client";
import dynamic from 'next/dynamic';
import Right from '../../../components/create'

import { useEffect, useState } from 'react';

// Dynamically load the Map component to avoid SSR issues
const Map = dynamic(() => import('../../../components/map'), {
  ssr: false,
});

export default function Home() {

  const [username, setUsername] = useState("")

  const handleLogout = async () => {
    const res = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await res.json();

    if (data.result === "ok") {
      window.location.reload()
    }
  }

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
        setUsername(data.user.username)
      }
    };

    fetch_session();
  }, []);

  return (
    <div className="flex relative overflow-hidden h-screen">
      <div className="flex-1 overflow-hidden z-0">
        <Map />
      </div>

      <div className="flex flex-col w-[500px] relative top-0 left-0 h-full bg-[#eeffe0] z-1">
        {/* TOPBAR */}
        <div className="flex justify-between  border-black items-center ">
          <h1 className="p-4 text-md text-black font-bold">
            Hello, {username}.
          </h1>
          <div className='p-4'>
            <button
              className="bg-transparent mr-4 border-2 text-sm border-black text-black rounded-xl p-2 hover:bg-green-600 hover:border-green-600 hover:text-white transition duration-300"
            >
              View Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-transparent border-2 text-sm border-black text-black rounded-xl p-2 hover:bg-red-600 hover:border-red-600 hover:text-white transition duration-300"
            >
              Log out
            </button>
          </div>
        </div>

        {/* RIGHT MENU */}
        <Right />
      </div>
    </div>
  );
}
function setOpen(arg0: boolean): void {
  throw new Error('Function not implemented.');
}

