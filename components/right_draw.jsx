"use client";
import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
const BottomSheet = ({ paperProps, open, setOpen, content }) => {

  return (
    <div>
      {/* DRAWER */}
      <SwipeableDrawer
        variant="persistent"
        anchor="right"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        PaperProps={paperProps}
      >
        <div className='px-5'>
          {content}
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default BottomSheet;
