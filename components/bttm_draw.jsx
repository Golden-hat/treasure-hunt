"use client";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
const BottomSheet = ({ paperProps, open, setOpen, content }) => {

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
          <div style={{cursor:"pointer"}} onClick={() => setOpen(false)} className='cursor-pointer flex justify-center'>
            <div style={{
              width: "60px",
              height: "5px",
              backgroundColor: "gray",
              border: '2px solid gray',
              borderRadius: '0.5rem',
              marginBottom: "10px",
              marginTop: "20px",
            }} />
          </div>
          {content}
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default BottomSheet;
