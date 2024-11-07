"use client";
import Drawer from './draw_bottom';
import CheckpointInfo from './cp_info';
import React, { useState, useMemo, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import dynamic from "next/dynamic";

class Hunt {
  constructor(name, checkpoints, id, description) {
    this.id = id;
    this.checkpoints = checkpoints;
    this.name = name;
    this.description = description;
    this.isQr = false;
    this.init_location = checkpoints[0].marker.position;
  }
}

const Right = ({ username, hunts }) => {
  return (
    <div className="overflow-auto px-6 relative h-screen">
      <div className="mb-6 rounded-2xl text-center bg-[#e6e6e6] p-6">
        <h1 className="font-bold text-6xl mb-5 font-caveat">
          Latest Hunts in your Area!
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
        </div>
      </div>
    </div>
  );
};

export default Right;
