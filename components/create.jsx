"use client";
import React from 'react';
import Drawer from './drawer'
import Details from './details'
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const Right = () => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  const paperProps = {
    style: {
      width: "399px",
      height: "100%",
      marginLeft: "auto",
      marginRight: "1px",
      borderTopRightRadius: "15px",
      borderTopLeftRadius: "15px",
      zIndex: "0",
      backgroundColor: "rgb(242, 242, 242)"
    },
  };


  const [open, setOpen] = React.useState(false);
  const input = <button onClick={() => setOpen(!open)}
    className='font-bold bg-transparent border-2 text-sm border-black 
    text-black rounded-xl p-2 hover:bg-green-600
    hover:border-green-600 hover:text-white 
    transition duration-300'>
    View Checkpoints
  </button>

  const content =
    <>
      <h3 className="text-lg font-bold mb-12">
        Checkpoint View
      </h3>
      <div className="flex justify-center">
        <img src="/nocheck.svg" alt="Description of image" className="w-[80%]" />
      </div>
      <div className='mb-12'>
      </div>
      <div>
        <Details></Details>
      </div>
    </>

  return (
    <div style={{ overflow: "auto", padding: "15px", paddingTop: "15px", paddingLeft: "15px", paddingRight: "15px", position: 'relative', height: '100vh'}}>
      <h1 className='text-center font-bold text-4xl mb-2'>Create Hunt</h1>
      <div className='text-center'>
        <span className='text-md text-center'>
          Hunts are made out of checkpoints. Set a checkpoint <span className='font-bold'>by clicking on the map</span> at the point in which you want to place them.
        </span>
      </div>

      <div style={{ padding: 15 }}>
        <div className='cursor-pointer flex justify-center'>
          <div style={{
            width: "300px",
            height: "5px",
            backgroundColor: "gray",
            border: '2px solid gray',
            borderRadius: '0.5rem',
            marginBottom: "10px",
            marginTop: "10px",
          }} />
        </div>
      </div>

      <form className="flex flex-col px-3 w-full" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">
          Hunt Details
        </h1>
        <h2 className="mt-2 italic text-sm mb-4">
          New adventure awaits!
        </h2>
        <div className="flex flex-col">
          <label className='font-bold'>Name of the Hunt:</label>
          <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="border border-black rounded p-1 mb-1" />
          <label>Description of the Hunt:</label>
          <textarea
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="border border-black rounded p-2 mb-2 w-full h-32" // Adjust width and height as needed
          ></textarea>
          <label>Difficulty:</label>
          <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="range" className=" p-1" />
          <div className='flex flex-row justify-between mb-6'>
            <p className='text-sm italic'>Very easy</p><p className='text-sm italic'>Medium</p><p className='text-sm italic'>Very Hard</p>
          </div>
        </div>

        {/* BUTTONS */}
          {input}
        <div className="flex justify-center mt-5">
          <button type="submit" className="flex justify-center font-bold align-center w-full items-center text-2xl bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
            {loading ? <div className="spinner"></div> : "Upload Hunt"}
          </button>
        </div>
        <div className="flex justify-center mt-5">
          <h1 className="text-center">
          </h1>
        </div>
      </form>

      {/* DRAWER */}
      <Drawer paperProps={paperProps} open={open} setOpen={setOpen} content={content}></Drawer>
    </div>
  );
};

export default Right;
