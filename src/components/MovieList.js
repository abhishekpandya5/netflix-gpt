import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  //   console.log(movies);
  return (
    <div className="pl-12 py-2">
      <h1 className="text-2xl py-6 text-white">{title}</h1>
      <div className="flex overflow-x-scroll scroll-p-0">
        <div className="flex gap-3">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
