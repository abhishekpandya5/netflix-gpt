import { useEffect } from "react";
import Header from "./Header";
import { options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const Browse = () => {
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
  }, [dispatch]);

  return (
    <div>
      <Header />
    </div>
  );
};

export default Browse;
