import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId);

  const trailer = useSelector((store) => store.movies?.trailerVideo);
  if (!trailer) return;

  return (
    <div className=" w-full">
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailer.key}?&autoplay=1&mute=1&loop=1&controls=0&showinfo=0`}
        title="video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
