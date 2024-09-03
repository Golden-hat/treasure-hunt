// pages/index.js
"use client"
import dynamic from 'next/dynamic';

// Dynamically load the Map component to avoid SSR issues
const Map = dynamic(() => import('../../../components/map'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative flex overflow-hidden h-screen">
      <div className="fixed top-0 left-0 h-full w-48 bg-[#eeffe0] z-10">
        Banner
      </div>
      <div className="flex-1 overflow-hidden ml-48 mr-48">
        <Map />
      </div>
      <div className="fixed top-0 right-0 h-full w-48 bg-[#eeffe0] z-10">
        Banner
      </div>
    </div>
  );
}
