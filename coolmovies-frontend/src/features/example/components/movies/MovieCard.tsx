import { Card, CardActionArea, CardContent, Typography, Rating } from "@mui/material";
import { Movie } from "../../../../generated/graphql";

type Props = {
  movie: Movie;
  onSelect: (movie: Movie) => void;
};

export default function MovieCard({ movie, onSelect }: Props) {
  return (
    <Card
      sx={{
        width: 260,
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
        border: "1px solid #cae4ffff",
        backgroundColor: "white",
      }}
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

          <Rating
            value={5}
            readOnly
            size="small"
            sx={{ alignSelf: "flex-start" }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
