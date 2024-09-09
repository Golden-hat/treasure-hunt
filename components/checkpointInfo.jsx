"use client";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";

const CheckpointInfo = ({ index, toggleDetails, openDetails, place, coordinates }) => {

  const Quill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
  const [remember, setRemember] = useState(false);
  const [placeEdit, setPlaceEdit] = useState(place);
  const [describe, setDescribe] = useState("");

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row items-center'>
        <div className='flex items-center justify-center w-12 mr-4 h-12 bg-blue-400 text-white rounded-full'>
          <h1 className='flex text-xl font-extrabold'>{index+1}</h1>
        </div>
        <div className='max-w-[300px]'>
          <h1 className='font-bold break-words'>{placeEdit}</h1>
          <p>{coordinates}</p>
        </div>
        {/* Toggle details button */}
        <button onClick={toggleDetails} className='ml-auto'>
          {openDetails ?
            <img src="/arrow.svg" alt="Description of image" className="cursor-pointer scale-[1] ml-auto p-2 mr-0" />
            :
            <img src="/arrow.svg" alt="Description of image" className="rotate-180 cursor-pointer scale-[1] ml-auto p-2 mr-0" />}
        </button>
      </div>

      {openDetails && (
        <div className='mb-2 mt-4 max-w-[450px] h-fit rounded-2xl bg-[#e6e6e6] m-auto px-2 pt-4'>
        <div className='overflow-auto mb-5'>
          <div className='flex flex-col justify-center items-center mb-4'>
            <h1 className='font-bold text-3xl font-caveat text-left px-6 mb-6'>Checkpoint Details</h1>
            <div className='cursor-pointer hover:bg-[#c6c6c6] bg-[#d6d6d6] rounded-full p-20 mb-2'>
              <img src="/add.svg" alt="Description of image" className="scale-[3]" />
            </div>
            <p className='text-xs mb-2'>Click to add a picture!</p>
          </div>
        </div>
        <form className="flex flex-col px-3 w-full">
        <label className='font-bold'>Name of the Hunt:</label>
        <input type="text" value={placeEdit} onChange={(e) => { setPlaceEdit(e.target.value) }} className="border border-black rounded p-1 mb-3" />
          <div className="flex flex-col mb-24">
            <label className='text-md mb-1'>Checkpoint info</label>
            <Quill value={describe} onChange={setDescribe} style={{ height: "125px" }} />
          </div>
          <div className="flex items-center mb-1">
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
      )}
    </div>
  );
};

export default CheckpointInfo;
