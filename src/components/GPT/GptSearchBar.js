import { useRef } from "react";
import { useSelector } from "react-redux";
import lang from "../../utils/languageConstants";
import openai from "../../utils/openai";

const GptSearchBar = () => {
  const activeLanguage = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const handleGptSearchClick = async () => {
    // console.log(searchText.current.value);
    const content = searchText.current.value;
    const result = await openai.chat.completions.create({
      messages: [{ role: "user", content: content }],
      model: "gpt-3.5-turbo",
    });
    console.log(result);
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[activeLanguage].gptSearchPlaceholder}
          className="py-2 px-4 m-4 col-span-9"
        />
        <button
          className="col-span-3 py-2 px-4 m-4 bg-red-color rounded-lg text-white"
          onClick={handleGptSearchClick}
        >
          {lang[activeLanguage].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
