import { Movie } from "../../../../generated/graphql";
import MovieCard from "./MovieCard";

type Props = {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
  getAverageRating: (movieId: string) => number;
};

export default function MoviesList({ movies, onSelect, getAverageRating }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "48px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard
            movie={movie}
            onSelect={onSelect}
            getAverageRating={getAverageRating}
          />
        </div>
      ))}
    </div>
  );
}
