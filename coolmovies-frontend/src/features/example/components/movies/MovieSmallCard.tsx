import { Box, Card, CardContent, Rating, Typography } from "@mui/material";
import { Movie } from "../../../../generated/graphql";

type Props = {
    selectedMovie: Movie;
    getAverageRating: (movieId: string) => number;
}

export default function MoviesSmallCard({ selectedMovie, getAverageRating }: Props) {
  return(
        <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: 'max-content',
                  padding: 1,
                  borderRadius: 3,
                  border: "1px solid #8ca5e2ff",
                  boxShadow: 'none',
                  backgroundColor: "#f0f5ffff",
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 90,
                    borderRadius: 2,
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={selectedMovie.imgUrl}
                    alt={selectedMovie.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                <CardContent sx={{ padding: "8px 16px", textAlign: "left" }}>
                  <Typography variant="h6">
                    {selectedMovie.title}
                  </Typography>

                  <div style={{display: "flex", alignItems: "center", gap: 5}}>
                    <Rating value={getAverageRating(selectedMovie.id)} readOnly size="small" precision={0.5} />
                    <Typography variant="body2" color="textSecondary">
                      {getAverageRating(selectedMovie.id)}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Box>
        </div>
  )
}