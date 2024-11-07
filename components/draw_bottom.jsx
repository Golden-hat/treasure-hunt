"use client";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
const BottomSheet = ({ paperProps, open, setOpen, content, auxFunction}) => {

  return (
    <div>
      {/* DRAWER */}
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        variant='persistent'
        // BackdropProps={{ invisible: true }}
        PaperProps={paperProps}
      >
        <div style={{paddingLeft:20, paddingRight:20}}>
          <div style={{cursor:"pointer", marginTop:"20px"}} onClick={() => {setOpen(false); auxFunction()}} className='cursor-pointer flex justify-center'>
            <img
              src="/arrow.svg"
              alt="Description of image"
              className="cursor-pointer scale-[1] p-2 "
            />
          </div>
          {content}
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default BottomSheet;
