import { Grid } from "@mui/material";
import { Movie } from "../../../../generated/graphql";
import MovieCard from "./MovieCard";

type Props = {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
};

export default function MoviesList({ movies, onSelect }: Props) {
  return (
    <Grid container spacing={3} justifyContent="center">
      {movies.map((movie) => (
        <Grid item key={movie.id}>
          <MovieCard movie={movie} onSelect={onSelect} />
        </Grid>
      ))}
    </Grid>
  );
}
