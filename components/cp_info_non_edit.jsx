"use client";
import { useState, useEffect } from "react";
import Quill from "react-quill";

const CheckpointInfo = ({ checkpoint, index, setFocus }) => {
  const [placeEdit, setPlaceEdit] = useState(checkpoint.name);
  const [description, setDescribe] = useState(checkpoint.description);
  const [toggleDetails, setToggleDetails] = useState(false);

  const forma = (
    <form className="flex flex-col px-3 w-full">
      <label className="font-bold">Name of the Checkpoint:</label>
      <input
        type="text"
        value={placeEdit}
        key={index}
        readOnly
        className="border border-black rounded p-1 mb-3 bg-gray-200 cursor-not-allowed"
      />
      <div className="flex flex-col mb-4">
        <label className="text-md mb-1">Checkpoint info</label>
        <Quill
          key={index}
          modules={{ toolbar: false }}
          value={description}
          readOnly={true}
          style={{ height: "200px" }}
        />
      </div>
    </form>
  );

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-row items-center"
        onClick={() => setFocus(checkpoint.marker.position)}
      >
        <div className="flex items-center justify-center w-12 mr-4 h-12 bg-blue-400 text-white rounded-full">
          <h1 className="flex text-xl font-extrabold">{checkpoint.order}</h1>
        </div>
        <div className="max-w-[300px]">
          <h1 className="font-bold break-words">{placeEdit}</h1>
          <p className="text-xs">
            {checkpoint.marker.position[0]}, {checkpoint.marker.position[1]}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setToggleDetails(!toggleDetails);
          }}
          className="ml-auto"
        >
          {!toggleDetails ? (
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

      {toggleDetails && (
        <div className="mt-4 w-full h-fit rounded-2xl bg-[#e6e6e6] m-auto px-2 pt-4">
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
          <div className="flex justify-center items-center">
            <button
              id="toggle"
              onClick={(e) => {
                e.stopPropagation();
                setToggleDetails(!toggleDetails);
              }}
              className="mb-4"
            >
              {!toggleDetails ? (
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
        </div>
      )}
    </div>
  );
};

export default CheckpointInfo;
