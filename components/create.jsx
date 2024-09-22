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

const Right = ({ setFocus, username, checkpoints, fetchCheckpoints, fetchDetails }) => {

  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [open, setOpen] = useState(false);
  const [qr, setQr] = useState(false);
  const [dragEnabled, setDragEnabled] = useState(true);
  const [openDetails, setOpenDetails] = useState(Array(50).fill(false));

  const Quill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = checkpoints.findIndex((item) => item.id === active.id);
      const newIndex = checkpoints.findIndex((item) => item.id === over.id);

      const newCheckpoints = arrayMove(checkpoints, oldIndex, newIndex);

      let iterator = 1
      newCheckpoints.forEach(element => {
        element.order = iterator
        iterator++;
      });

      fetchCheckpoints(newCheckpoints);
    }
  };

  useEffect(() => { fetchDetails(dragEnabled); }, [dragEnabled])

  const toggleDetails = (index) => {
    const updatedOpenDetails = openDetails.map((state, i) => (i === index ? !state : state));
    setOpenDetails(updatedOpenDetails);
    setDragEnabled(!updatedOpenDetails.includes(true));
  };

  const paperProps = {
    style: {
      maxWidth: "499px",
      height: "100%",
      marginLeft: "auto",
      marginRight: "1px",
      zIndex: "100",
      overflowY: "hidden",
      backgroundColor: "rgb(242, 242, 242)",
    },
  };

  const input = (
    <button onClick={() => {
      setOpen(true)
      setOpenDetails(Array(50).fill(false))
      setDragEnabled(true)
    }}
      className='font-bold bg-transparent border-2 text-sm border-black 
      text-black rounded-xl p-2 hover:bg-green-600
      hover:border-green-600 hover:text-white 
      transition duration-300'>
      View Checkpoints
    </button>
  );

  const DraggableCheckpoint = ({ id, checkpoints, index }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      padding: '16px',
      paddingBottom: '8px',
      margin: '8px 0',
      background: 'lightgray',
      borderRadius: '4px',
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} onClick={() => { setFocus(checkpoints[index].marker.position); }}>
        <div className="checkpoint-content">
          <CheckpointInfo
            key={id}
            id={id}
            index={index}
            openDetails={openDetails[id]}
            toggleDetails={() => toggleDetails(id)}
            checkpoints={checkpoints}
            fetchCheckpoints={fetchCheckpoints}
          />

        </div>

        {/* DRAG HANDLE */}
        {dragEnabled ? (
          <div>
            <div
              className='flex justify-center'
            >
              <img {...listeners} src="/drag.svg" alt="Description of image" className="cursor-grab h-[8%] w-[8%] rotate-90" />
            </div>
          </div>
        ) : <div className='mb-[34px]'>
        </div>}
      </div>
    );
  };

  const content = (
    <>
      <h3 className="text-2xl mt-6 font-bold mb-4">Checkpoint View</h3>
      {
        checkpoints.length === 0 ? (
          <div className="flex justify-center">
            <img src="/nocheck.svg" alt="No checkpoints" className="w-[80%]" />
          </div>
        ) : (
          <div className="">
            <h1 className='mb-4'>
              You can place <span className='font-bold'>up to 50 checkpoints</span>.
            </h1>
            <button
              onClick={() => {
                setOpenDetails(Array(50).fill(false));
                setDragEnabled(true);
              }}
              className='font-bold bg-transparent border-2 text-sm border-black 
              text-black rounded-xl p-2 hover:bg-blue-400 hover:border-blue-400 hover:text-white 
              transition duration-100 mb-4'>
              Collapse All
            </button>
            {(!dragEnabled) ? <h1 className='pr-4 text-green-600, text-sm text-center'>Details open. Dragging, creating and deleting points is disabled </h1> : <div className='pr-4 text-green-600, text-sm text-center'>Click on an arrow to change details of the checkpoints</div>}
            <div className='mt-4 flex flex-col overflow-y-auto h-[70vh] max-h-screen'>
              <div className="pr-4">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={checkpoints} strategy={verticalListSortingStrategy}>
                    <div className='flex flex-col'>
                      {console.log(checkpoints)}
                      {checkpoints.map((checkpoint, index) => (
                        <DraggableCheckpoint
                          index={index}
                          key={checkpoint.id}
                          id={checkpoint.id}
                          checkpoints={checkpoints}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          </div>
        )
      }
    </>

  );

  return (
    <div className="overflow-auto px-6 relative h-screen">
      <div className='mb-6 rounded-2xl bg-[#e6e6e6] p-6'>
        <h1 className='font-bold text-4xl mb-2 font-caveat'>Create Hunt</h1>
        <div>
          <span className='text-md'>
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
            <h1 className='font-caveat text-center text-2xl italic bold text-gray-600'>By {username}</h1>
          </div>
        </div>
        <Quill readOnly={true} theme="snow" modules={{ toolbar: false, matchVisual: false }} value={editorContent}></Quill>
      </div>

      <div className='mb-10 rounded-2xl bg-[#e6e6e6] px-2 pt-6'>
        <form className="flex flex-col px-3 w-full" onSubmit={handleSubmit}>
          <h1 className="text-3xl mb-2 font-bold">
            Hunt Details
          </h1>

          <p className='text-sm mt-1 mb-4'>
            The Hunts require <span className='font-bold'>network access and cellullar data to be easily accessible</span>, to provide the best experience for hunters. <span className='font-bold'>
              Hunts can only be progressed by hunters connected to the internet, or by hunters who <span className='text-green-600 font-extrabold'>preload their hunt.</span></span>
          </p>

          <div className="flex flex-col">
            <label className='font-bold'>Name of the Hunt:</label>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="border border-black rounded p-1 mb-3" />
            <label className='mb-1'>Description of the Hunt:</label>
            <Quill value={editorContent} onChange={setEditorContent} style={{ height: "125px" }} />
            <label className='mt-14'>Difficulty:</label>
            <input value={difficulty} onChange={(e) => { setDifficulty(e.target.value) }} type="range" className="" />
            <div className='flex flex-row justify-between mb-6'>
              <p className='text-sm'>Very easy</p><p className='text-sm '>Medium</p><p className='text-sm '>Very Hard</p>
            </div>
          </div>

          <label class="relative inline-flex cursor-pointer items-center ">
            <div className='flex flex-row mb-2 justify-center items-center'>
              <input onChange={() => { setQr(!qr) }} id="switch-3" type="checkbox" class="peer scale-[1.2] sr-only" />
              <div class="scale-[1.2] peer h-4 w-12 rounded border bg-slate-400 after:absolute after:-top-[5px] after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-focus:ring-green-300 mr-4"></div>
              {qr ? <h1>QR Hunt</h1> : <h1>Tour</h1>}
            </div>
          </label>

          {qr ? 
            <p className='text-sm mt-1 mb-6'>
              QR Hunts <span className='font-bold'>will create a QR code for each checkpoint </span> that can be scanned by hunters to get hints to the next checkpoint. <span className='font-bold'>
              This conceals all checkpoints but the first one. </span>
          </p> :
            <p className='text-sm mt-1 mb-6'>
              Tours <span className='font-bold'> will show every checkpoint that comprises the hunt in the map. </span> This mode is useful to highlight the staples of a location and to offer a more laid back experience to hunters.<span className='font-bold'> </span>
            </p>
          }

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
