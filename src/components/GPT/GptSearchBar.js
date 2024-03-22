import React from "react";

const GptSearchBar = () => {
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          placeholder="What would you like to watch today?"
          className="py-2 px-4 m-4 col-span-9"
        />
        <button className="col-span-3 py-2 px-4 m-4 bg-red-color rounded-lg text-white">
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
