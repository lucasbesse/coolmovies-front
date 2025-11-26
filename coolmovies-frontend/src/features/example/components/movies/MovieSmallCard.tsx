import { Box, Card, CardContent, Rating, Typography } from "@mui/material";
import { Movie } from "../../../../generated/graphql";

type Props = {
    selectedMovie: Movie;
}

export default function MoviesSmallCard({ selectedMovie }: Props) {
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

                  <Rating value={5} readOnly size="small" />
                </CardContent>
              </Card>
            </Box>
        </div>
  )
}