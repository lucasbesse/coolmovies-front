import { Card, CardActionArea, CardContent, Typography, Rating } from "@mui/material";
import { Movie } from "../../../../generated/graphql";
import { styles } from "../styles";

type Props = {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  getAverageRating: (movieId: string) => number;
};

export default function MovieCard({ movie, onSelect, getAverageRating }: Props) {
  return (
    <Card
      sx={styles.movieCard}
    >
      <CardActionArea onClick={() => onSelect(movie)}>
        <img
          src={movie.imgUrl}
          alt={movie.title}
          style={{
            width: "100%",
            height: 360,
            objectFit: "cover",
          }}
        />

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingX: 2,
            paddingY: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ textAlign: "left" }}
          >
            {movie.title}
          </Typography>

          <div style={{display: "flex", alignItems: "center", gap: 5}}>
            <Rating value={getAverageRating(movie.id)} readOnly size="medium" precision={0.5} />
            <Typography variant="body2" color="textSecondary">
              {getAverageRating(movie.id)}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
