"use client";
import dynamic from 'next/dynamic';
import Create from '../../../components/create'
import Right_draw from '../../../components/menu_right'
import Browse from '../../../components/browse'
import { useEffect, useState } from 'react';
import React from 'react';

// Dynamically load the Map component to avoid SSR issues
const Map = dynamic(() => import('../../../components/map'), {
  ssr: false,
});

export default function Home() {

  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState("")
  const [checkpoints, setCheckpoints] = useState([])
  const [focus, setFocus] = useState([39.42858790570836,-0.41886180536852896])
  const [mode, setMode] = useState(0)
  const [hunts, setHunts] = useState([])

  const fetchCheckpoints = (childData) => {
    setCheckpoints(childData);
  };

  const fetchHunts = (childData) => {
    console.log(childData)
    setHunts(childData);
  };

  {/* MENU CONTENT */ }
  const paperProps = {
    style: {
      width:"100%",
      maxWidth: "600px",
      height: "100%",
      zIndex: "2",
      backgroundColor: "rgb(242, 242, 242)"
    },
  };

  const stringArray = ['Home', 'Create Hunts', 'Profile', 'Log out', 'About Us'];
  const content =
    <div className=''>
      <h1 className="font-extrabold font-caveat text-5xl mt-[13px] pb-4 border-black border-b-2 w-full">
        Treasure Hunts
      </h1>
      {stringArray.map((item, index) => (
        <p className="font-bold text-2xl text-black pt-6 pb-6 
                      border-b-[1px] border-gray-600 hover:text-green-600 
                      cursor-pointer transition duration-100" 
          key={index}
          onClick={() => handleButtonClick(index)}>
            {item}
        </p>
      ))}
    </div>
    
  const handleButtonClick = (index) => {
    if (index === 3) {
      handleLogout()
    }
    if (index !== 1) {
      setCheckpoints([])
    }
    setMode(index)
    setOpen(false)
  };

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
    const fetch_hunts = async () => {
      const res = await fetch('/api/get_hunts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json();

      if (data.result === "ok") {
        setHunts(data.hunts)
      }
    };
    fetch_session();

    setCheckpoints(checkpoints)
  }, [checkpoints]);

  return (
    <div className="flex relative overflow-hidden h-screen">
      <div className="flex-1 overflow-hidden z-0">
        <Map checkpoints={checkpoints} fetchCheckpoints={fetchCheckpoints} focus={focus} mode={mode} hunts={hunts} fetchHunts={fetchHunts}/>
      </div>

      <div className="flex flex-col w-[600px] relative top-0 left-0 h-full bg-[#eeffe0] z-1">

        {/* TOPBAR */}
        <div className="flex px-6 pt-6 justify-between mb-6 border-black items-center ">
          <h1 className="text-xl font-extrabold text-black">
            Hello, {username}.
          </h1>
            <button className='z-10'
              onClick={() => setOpen(!open)}
            >
              <img src="/menu.svg" className="w-[100%] h-[100%]" alt="Menu" />
            </button>
        </div>

        {/* MENU */}
        <Right_draw paperProps={paperProps} open={open} setOpen={setOpen} content={content}></Right_draw>

        {/* HOME */}
        {mode === 0 && <Browse setFocus={setFocus} username={username} hunts={hunts} fetchHunts={fetchHunts}/>}

        {/* CREATE */}
        {mode === 1 && <Create setFocus={setFocus} username={username} checkpoints={checkpoints} fetchCheckpoints={fetchCheckpoints} />}
      </div>
    </div>
  );
}

