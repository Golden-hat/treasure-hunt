"use client";
import { useState, useEffect } from "react";
import Quill from "react-quill";


const CheckpointInfo = ({ checkpoint, setFocus, index, updateCheckpoints }) => {
  const [placeEdit, setPlaceEdit] = useState(checkpoint.tempPlace);
  const [describe, setDescribe] = useState(checkpoint.tempDescribe);

  const modifyInfo = (e) => {
    e.preventDefault();
    const copy = checkpoint;
    copy.place = placeEdit;
    copy.describe = describe;
    copy.tempPlace = placeEdit;
    copy.tempDescribe = describe;
    copy.editing = !copy.editing;
    updateCheckpoints(copy, index);
  };

  const toggleDetails = (e) => {
    e.preventDefault();
    const copy = checkpoint;
    copy.editing = !copy.editing;
    if (!copy.editing) {
      copy.tempPlace = checkpoint.place;
      copy.tempDescribe = checkpoint.describe;
    }
    updateCheckpoints(copy, index);
  };
  
  useEffect(() => {
    const copy = checkpoint
    copy.tempPlace = placeEdit;
    copy.tempDescribe = describe;
  }, [placeEdit, describe]);

  const forma = (
    <form className="flex flex-col px-3 w-full">
    <label className="font-bold">Name of the Checkpoint:</label>
    <input
      type="text"
      value={placeEdit}
      key = {index}
      onChange={(e) => setPlaceEdit(e.target.value)}
      className="border border-black rounded p-1 mb-3"
    />
    <div className="flex flex-col mb-24">
      <label className="text-md mb-1">Checkpoint info</label>
      <Quill
        key={index}
        value={describe}
        onChange={setDescribe}
        style={{ height: "125px" }}
      />
    </div>
    <button
      onClick={modifyInfo}
      className="font-bold bg-transparent border-2 text-sm border-black 
      text-black rounded-xl p-2 hover:bg-green-600
      hover:border-green-600 hover:text-white 
      transition duration-150 mb-4"
    >
      Apply Changes
    </button>
    <div className="flex justify-center items-center">
      <button id="toggle" onClick={toggleDetails} className="mb-4">
        {checkpoint.visible ? (
          <img
            src="/arrow.svg"
            alt="Description of image"
            className="cursor-pointer scale-[1] ml-auto p-2 mr-0"
          />
        ) : (
          <img
            src="/arrow.svg"
            alt="Description of image"
            className="rotate-180 cursor-pointer scale-[1] ml-auto p-2 mr-0"
          />
        )}
      </button>
    </div>
  </form>
  );

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-row items-center"
        onClick={() => {
          setFocus(checkpoint.marker.position);
        }}
      >
        <div className="flex items-center justify-center w-12 mr-4 h-12 bg-blue-400 text-white rounded-full">
          <h1 className="flex text-xl font-extrabold">{index + 1}</h1>
        </div>
        <div className="max-w-[300px]">
          <h1 className="font-bold break-words">{placeEdit}</h1>
          <p className="text-xs">
            {checkpoint.marker.position[0]},{" "}
            {checkpoint.marker.position[1]}
          </p>
        </div>
        <button onClick={toggleDetails} className="ml-auto">
          {checkpoint.editing ? (
            <img
              src="/arrow.svg"
              alt="Description of image"
              className="cursor-pointer scale-[1] ml-auto p-2 mr-0"
            />
          ) : (
            <img
              src="/arrow.svg"
              alt="Description of image"
              className="rotate-180 cursor-pointer scale-[1] ml-auto p-2 mr-0"
            />
          )}
        </button>
      </div>

      {checkpoint.editing && (
        <div className="mt-4 max-w-[450px] h-fit rounded-2xl bg-[#e6e6e6] m-auto px-2 pt-4">
          <div className="overflow-auto mb-5">
            <div className="flex flex-col justify-center items-center mb-4">
              <h1 className="font-bold text-3xl font-caveat text-left px-6 mb-6">
                Checkpoint Details
              </h1>
              <div className="cursor-pointer hover:bg-[#c6c6c6] bg-[#d6d6d6] rounded-full p-20 mb-2">
                <img
                  src="/add.svg"
                  alt="Description of image"
                  className="scale-[3]"
                />
              </div>
              <p className="text-xs mb-2">Click to add a picture!</p>
            </div>
          </div>
          {forma}
        </div>
      )}
    </div>
  );
};

export default CheckpointInfo;
