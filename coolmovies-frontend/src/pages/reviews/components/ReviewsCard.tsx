import { Card, CardContent, Avatar, Typography, Box, Rating } from "@mui/material";
import { MovieReview } from "../../../generated/graphql";

type Props = {
  review: MovieReview;
};

// boxShadow: "0 4px 10px rgba(0,0,0,0.2)"

export default function ReviewCard({ review }: Props) {
  return (
    <Card
      sx={{
        borderRadius: "24px",
        p: 0,
        width: 360,
        height: 330,
        display: "flex",
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "secondary.light",
      }}
    >
      <CardContent
        sx={{
          p: 3,
          pb: 1,
          flexGrow: 1,
        }}
      >
        <Rating value={review.rating ?? 5} readOnly size="small" sx={{ mb: 1 }} />

        <Typography
            sx={{
                maxHeight: 170,
                overflowY: "auto",
                paddingRight: 2,
                marginTop: 1,
                scrollbarWidth: "thin",
                scrollbarColor: "#888 transparent",

                "&::-webkit-scrollbar": {
                width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "8px",
                border: "2px solid transparent",
                backgroundClip: "content-box",
                },
            }}
        >
          {review.body}
        </Typography>
      </CardContent>

      <Box
        sx={{
          mt: 2,
          p: 2,
          display: "flex",
          width: "60%",
          alignItems: "center",
          background: "#fff",
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "0px",
          borderTopLeftRadius: "2px",
          borderTopRightRadius: "24px",
        }}
      >
        <Avatar src="https://i.pravatar.cc/100" sx={{ width: 40, height: 40, mr: 1 }} />

        <Box sx={{ ml: 1, textAlign: "left" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {review.title}
          </Typography>

          <Typography variant="caption" sx={{ color: "#666" }}>
            @username
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}


