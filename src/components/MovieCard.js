import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={"/watch?id=" + movie.id}>
      <div className="w-48">
        <img alt={movie.title} src={IMG_CDN_URL + movie.poster_path} />
      </div>
    </Link>
  );
};

export default MovieCard;
