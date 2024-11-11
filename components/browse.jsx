"use client";
import Drawer from "./draw_bottom";
import CheckpointInfo from "./cp_info_non_edit";
import React, { useState, useMemo, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import dynamic from "next/dynamic";

const Right = ({
  setFocus,
  selectedHunt,
  fetchSelectedHunt
}) => {

  const Quill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const [expand, setExpand] = useState(false);

  const DraggableCheckpoint = ({ id, checkpoints, index }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      paddingTop: "16px",
      paddingLeft: "16px",
      paddingRight: "16px",
      margin: "8px 0",
      background: "lightgray",
      borderRadius: "4px",
      cursor: "default",
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes}>
        <div className="checkpoint-content">
          <CheckpointInfo
            key={index}
            id={id}
            index={index}
            checkpoint={checkpoints[index]}
            setFocus={setFocus}
          />
        </div>
        <div className="mb-[34px]"></div>
      </div>
    );
  };

  const hunt = (
    <>
      {selectedHunt !== null && (
        <div
          className={`overflow-auto mb-5 rounded-2xl bg-[#d6d6d6] mt-10 px-2 pt-6 ${
            expand ? "h-auto" : "max-h-[450px]"
          }`}
        >
          <div className="flex flex-col justify-center items-center mb-4">
            <div className="cursor-pointer hover:bg-[#b6b6b6] bg-[#c6c6c6]  rounded-full p-20 mb-2">
              <img
                src="/add.svg"
                alt="Description of image"
                className="scale-[3]"
              />
            </div>
            <p className="text-xs mb-2">Click to add a banner!</p>
            <div className="flex flex-col items-center max-w-[80%]">
              <h1 className="font-caveat text-center text-5xl bold">
                {selectedHunt.name || ""}
              </h1>
              <h1 className="font-caveat text-center text-2xl italic bold text-gray-600">
                By
              </h1>
            </div>
          </div>
          <Quill
            readOnly={true}
            modules={{ toolbar: false }}
            style={{
              height: "fit-content",
              margin: "20px",
            }}
            value={selectedHunt.description || ""}
          ></Quill>
          <div className="flex flex-col mx-5">
            <label className="text-lg mb-2">
              Difficulty:{" "}
              <span className="font-bold">
                {selectedHunt.difficulty || "N/A"}
              </span>
            </label>
            <label className="text-sm">
              On a scale from 0 to 100! The higher the number, the harder the
              challenge.
            </label>
          </div>
          <button
            className="flex justify-center mx-auto mb-5 sticky bottom-2"
            onClick={() => setExpand(!expand)}
          >
            {!expand ? (
              <img
                src="/arrow.svg"
                alt="Description of image"
                className="cursor-pointer scale-[1] p-2"
              />
            ) : (
              <img
                src="/arrow.svg"
                alt="Description of image"
                className="rotate-180 cursor-pointer scale-[1] p-2"
              />
            )}
          </button>
        </div>
      )}
    </>
  );

  const content = (
    <>
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-2xl font-bold mt-2">Checkpoint View</h3>
        {selectedHunt !== null && (
          <button
            onClick={() => {
              fetchSelectedHunt(null);
            }}
            className="font-bold bg-transparent border-2 text-sm border-black 
              text-black rounded-xl p-2 hover:bg-blue-400 hover:border-blue-400 hover:text-white 
              transition duration-100 mt-2"
          >
            Deselect Hunt
          </button>
        )}
      </div>
      {selectedHunt === null ? (
        <div className="flex justify-center">
          <img src="/no_selection.svg" alt="No checkpoints" className="w-[80%]" />
        </div>
      ) : (
        <div className="">
          <div className="mt-4 flex flex-col overflow-y-auto max-h-[50vh]">
            <div className="">
              <DndContext collisionDetection={closestCenter}>
                <SortableContext
                  items={selectedHunt.checkpoints.map((cp) => cp.order)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-col">
                    {selectedHunt.checkpoints
                      .map((checkpoint, index) => (
                        <DraggableCheckpoint
                          disabled
                          index={index}
                          key={index}
                          id={checkpoint.id}
                          checkpoints={selectedHunt.checkpoints}
                        />
                      ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="overflow-auto px-6 relative h-screen">
      <div className="mb-6 rounded-2xl text-center bg-[#e6e6e6] p-6">
        <h1 className="font-bold text-6xl mb-5 font-caveat">
          Hunts in your Area!
        </h1>
        <div>
          <span className="text-lg">
            <span className="font-bold">
              {" "}
              Browse trendy hunts in your area.{" "}
            </span>
            Dragging the map will load more hunts
          </span>
        </div>
      </div>
      <div className="mb-6 rounded-2xl bg-[#e6e6e6] p-6">
        <h1 className="font-bold text-3xl mb-2 ">Browse Hunts!</h1>
        <div>
          <span className="">
            <span className="font-bold">
              {" "}
              Try searching for a specific hunt here...{" "}
            </span>
          </span>
          <div className="flex items-center w-full mt-2">
            <input
              type="text"
              className="font-caveat text-2xl w-full border border-gray-400 bg-green-200 rounded-l-xl p-2"
              placeholder="Search..."
            />
            <button
              type="button"
              className="bg-green-200 border border-gray-400 rounded-r-xl p-[12px] flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M9.5 17a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                />
              </svg>
            </button>
          </div>
          {hunt}
        </div>
      </div>
      <div className="mb-6 rounded-2xl bg-[#e6e6e6] p-6">{content}</div>
    </div>
  );
};

export default Right;
