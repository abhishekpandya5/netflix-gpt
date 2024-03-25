import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";
import { addPlaybackMovie } from "../utils/movieSlice";

const Playback = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("id");
  console.log(videoId);

  const getMovieVideo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${videoId}/videos?language=en-US`,
      API_OPTIONS
    );
    const videoData = await response.json();

    const filteredData = videoData.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filteredData.length
      ? filteredData[0]
      : videoData.results[0];
    dispatch(addPlaybackMovie(trailer));
  };

  useEffect(() => {
    getMovieVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const video = useSelector((store) => store.movies.playbackMovie);

  if (!video) return;

  return (
    <div className="w-full">
      <iframe
        className="w-full h-screen"
        src={`https://www.youtube.com/embed/${video.key}?&autoplay=1&showinfo=0`}
        title="video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default Playback;
