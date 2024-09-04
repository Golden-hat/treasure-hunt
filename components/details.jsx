"use client";
import React from 'react';
import Drawer from '../components/drawer'

const Right = () => {

  const paperProps = {
    style: {
      width: "400px",
      height: "100%",
      marginLeft: "auto",
      marginRight: "400px",
      borderTopRightRadius: "15px",
      borderTopLeftRadius: "15px",
      zIndex: "0",
      backgroundColor: "rgb(242, 242, 242)"
    },
  };

  const content =
    <>
      <h3 className="text-lg font-bold mb-12">
        Checkpoint Details
      </h3>
      <div className="flex justify-center">
        <img src="/nocheck.svg" alt="Description of image" className="w-[80%]" />
      </div>
    </>

  const [open, setOpen] = React.useState(false);
  const input = <button onClick={() => setOpen(!open)} className='w-full 
    font-bold bg-transparent border-2 text-sm border-black 
    text-black rounded-xl p-2 hover:bg-green-600
    hover:border-green-600 hover:text-white 
    transition duration-300'>
    Checkpoint Details
  </button>

  return (
    <div>
      {/* DRAWER BUTTON */}
        {input}
      {/* DRAWER */}
      <Drawer paperProps={paperProps} open={open} setOpen={setOpen} content={content}></Drawer>
    </div>
  );
};

export default Right;
