import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-0 aspect-video w-screen main-video-details pt-[15%] px-12 z-10 text-white bg-gradient-to-tr from-black">
      <h1 className="text-5xl font-bold my-2">{title}</h1>
      <p className="my-4 w-1/4">{overview}</p>
      <div className="flex gap-3">
        <button className="bg-white text-black font-bold p-4 px-12 rounded-md hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="bg-gray-500 text-white font-bold p-4 px-12 rounded-md">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
