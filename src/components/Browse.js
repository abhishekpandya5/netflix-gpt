import { useDispatch } from "react-redux";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { useTopRatedMovies } from "../hooks/useTopRatedMovies";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";
import { useGetNowPlayingMoviesQuery } from "../redux/services/tmdbCore";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { addNowPlayingMovies } from "../redux/features/movieSlice";

const Browse = () => {
  // const dispatch = useDispatch();
  const { data, isFetching, error } = useGetNowPlayingMoviesQuery();
  console.log(data);
  // fetching nowPlaying movie list inside custom hook.

  // dispatch(addNowPlayingMovies(data.results));

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </>
  );
};

export default Browse;

/*
Main container 
  - video background
  - video title
Secondary container
  - Movie list * n
    - cards * n
*/
