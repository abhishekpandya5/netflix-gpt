import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { options } from "../utils/constants";

export const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        options
      );
      const json = await data.json();
      dispatch(addNowPlayingMovies(json.results));
    };
    getNowPlayingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
};
