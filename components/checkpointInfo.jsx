"use client";
import React, { useState, useRef } from 'react';
import Quill from 'react-quill';

const checkpointInfo = ({ location, coords }) => {

  const [open, setOpen] = useState(false)
  const [describe, setDescribe] = useState(''); // Store the HTML content
  const [remember, setRemember] = useState(false);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row items-center'>
        <div className='flex items-center justify-center w-12 mr-4 h-12 bg-blue-400 text-white rounded-full'>
          <h1 className='flex text-xl font-extrabold'>10</h1>
        </div>
        <div className='max-w-[300px]'>
          <h1 className='font-bold'>Shadwell, Cable Street, St. George in the East, Wapping, London Borough of Tower Hamlets, London, Greater London, England, E1 2QF, United Kingdom</h1>
          <p>48.8584° N, 2.2945° E.</p>
        </div>
        {open ? <img onClick={() => setOpen(!open)} src="/arrow.svg" alt="Description of image" className="cursor-pointer scale-[1] ml-auto p-2 mr-0" /> :
          <img onClick={() => setOpen(!open)} src="/arrow.svg" alt="Description of image" className="rotate-180 cursor-pointer scale-[1] ml-auto p-2 mr-0" />
        }
      </div>
      {open ?
        <div className='mb-10 mt-4 max-w-[450px] h-fit rounded-2xl bg-[#e6e6e6] m-auto px-2 pt-4'>
          <div className='overflow-auto mb-5'>
            <div className='flex flex-col justify-center items-center mb-4'>
              <h1 className='font-bold text-3xl font-caveat text-left px-6 mb-6' > Checkpoint Details</h1>
              <div className='cursor-pointer hover:bg-[#c6c6c6] bg-[#d6d6d6] rounded-full p-20 mb-2'>
                <img src="/add.svg" alt="Description of image" className="scale-[3]" />
              </div>
              <p className='text-xs mb-2'>Click to add a banner!</p>
            </div>
          </div>
          <form className="flex flex-col px-3 w-full">
            <div className="flex flex-col mb-16">
              <label className='text-md mb-2'>Checkpoint info</label>
              <Quill value={describe} onChange={setDescribe} style={{ height: "125px" }} />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2"
              />
              <label onClick={() => setRemember(!remember)} className="select-none text-gray-500 text-sm">Make visible</label>
            </div>
            <p className='text-sm italic mt-1 mb-4'>
              Making a checkpoint visible will reveal its location in the map instead of keeping it a mistery. Note though that this will not
              reveal its information unless physically scanned.
            </p>
          </form>
        </div>
        :
        <></>
      }
    </div>
  );
};

export default checkpointInfo;