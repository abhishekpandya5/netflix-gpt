import React from "react";
import { useSelector } from "react-redux";
import lang from "../../utils/languageConstants";

const GptSearchBar = () => {
  const activeLanguage = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          placeholder={lang[activeLanguage].gptSearchPlaceholder}
          className="py-2 px-4 m-4 col-span-9"
        />
        <button className="col-span-3 py-2 px-4 m-4 bg-red-color rounded-lg text-white">
          {lang[activeLanguage].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
