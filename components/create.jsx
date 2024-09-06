"use client";
import Drawer from './bttm_draw'
import React, { useState, useRef, useEffect } from 'react';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useRouter } from "next/navigation";
import Link from "next/link";

const Right = ({ username }) => {

  const [name, setName] = useState("");
  const [difficulty, setdifficulty] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  const quillRef = useRef(null); // Reference to the editor div
  const [quill, setQuill] = useState(null); // State to hold the Quill instance
  const [editorContent, setEditorContent] = useState(''); // Store the HTML content

  const paperProps = {
    style: {
      maxWidth: "499px",
      height: "100%",
      marginLeft: "auto",
      marginRight: "1px",
      borderTopRightRadius: "40px",
      borderTopLeftRadius: "40px",
      zIndex: "100",
      backgroundColor: "rgb(242, 242, 242)",
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
    </>

  return (
    <div class="overflow-auto px-6 relative h-screen">
      <div className='mb-6 rounded-2xl bg-[#e6e6e6] p-6'>
        <h1 className='font-bold text-4xl mb-2 font-caveat'>Create Hunt</h1>
        <div className=''>
          <span className='text-md text-center'>
            Hunts are made out of checkpoints. Set a checkpoint <span className='font-bold'>by clicking on the map</span> at the point in which you want to place them.
          </span>
        </div>
      </div>

      {/* HUNT PREVIEW */}
      <div className='overflow-auto h-[380px] mb-5'>
        <div className='flex flex-col justify-center items-center mb-4'>
          <h1 className='font-caveat font-bold text-3xl text-left px-6 mb-6' >Details Preview</h1>
          <div className='cursor-pointer hover:bg-[#d6d6d6] bg-[#e6e6e6] rounded-full p-20 mb-2'>
            <img src="/add.svg" alt="Description of image" className="scale-[3]" />
          </div>
          <p className='text-xs mb-2'>Click to add a banner!</p>
          <div className='flex flex-col items-center max-w-[80%]'>
            <h1 className='font-caveat text-center text-5xl bold'>{name}</h1>
            <h1 className='font-caveat text-center text-2xl italic bold text-gray-600'>By {username}.</h1>
          </div>
        </div>
        <Quill theme="snow" modules={{ toolbar: false }} value={editorContent}></Quill>
      </div>

      <div className='mb-10 rounded-2xl bg-[#e6e6e6] px-2 pt-6'>
        <form className="flex flex-col px-3 w-full" onSubmit={handleSubmit}>
          <h1 className="text-3xl mb-2 font-bold">
            Hunt Details
          </h1>
          <div className="flex flex-col">
            <label className='font-bold'>Name of the Hunt:</label>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="border border-black rounded p-1 mb-3" />
            <label className=''>Description of the Hunt:</label>
            <Quill ref={quillRef} value={editorContent} onChange={setEditorContent} style={{ height: "125px" }} />
            <label className='mt-14'>Difficulty:</label>
            <input value={difficulty} onChange={(e) => { setdifficulty(e.target.value) }} type="range" className="" />
            <div className='flex flex-row justify-between mb-6'>
              <p className='text-sm'>Very easy</p><p className='text-sm '>Medium</p><p className='text-sm '>Very Hard</p>
            </div>
          </div>

          {/* BUTTON */}
          {input}
          <div className="flex justify-center mt-5">
            <button type="submit" className="flex justify-center font-caveat font-bold align-center w-full items-center text-3xl bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
              {loading ? <div className="spinner"></div> : "Upload Hunt"}
            </button>
          </div>
          <div className="flex justify-center mt-5">
            <h1 className="text-center">
            </h1>
          </div>
        </form>
      </div>

      {/* DRAWER */}
      <Drawer paperProps={paperProps} open={open} setOpen={setOpen} content={content}></Drawer>
    </div>
  );
};

export default Right;
