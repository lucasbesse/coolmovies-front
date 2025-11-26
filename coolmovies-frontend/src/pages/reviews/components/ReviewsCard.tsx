import { Card, CardContent, Avatar, Typography, Box, Rating, Button } from "@mui/material";
import { MovieReview } from "../../../generated/graphql";
import { useState } from "react";

type Props = {
  review: MovieReview;
};

export default function ReviewCard({ review }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{
        borderRadius: "24px",
        width: 360,
        height: 360,
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        boxShadow: "0 3px 12px rgba(0,0,0,0.12)",
        backgroundColor: "white",
        border: "1px solid #cae4ffff",
      }}
    >
      <Rating value={review.rating ?? 0} precision={0.5} readOnly size="small" sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar src={`https://i.pravatar.cc/150?u=${review.id}`} sx={{ width: 48, height: 48, mr: 1 }} />

        <Box sx={{ textAlign: "left" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
            {review.title}
          </Typography>

          <Typography variant="caption" sx={{ color: "gray" }}>
            @username
          </Typography>
        </Box>
      </Box>

      <Typography
        sx={{
          fontSize: "0.95rem",
          color: "#333",
          maxHeight: expanded ? 220 : 160,
          overflowY: expanded ? "auto" : "hidden",
          transition: "0.2s ease",
          mb: 1,

          ...( !expanded && {
            display: "-webkit-box",
            WebkitLineClamp: 7,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }),

          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,0,0,0.3) transparent",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.35)",
            borderRadius: "8px",
          },
        }}
      >
        {review.body}
      </Typography>

      {!expanded ? (
        <Button
          variant="text"
          onClick={() => setExpanded(true)}
          sx={{ textTransform: "none", fontSize: "0.9rem" }}
        >
          See more
        </Button>
      ) : (
        <Button
          variant="text"
          onClick={() => setExpanded(false)}
          sx={{ textTransform: "none", fontSize: "0.9rem" }}
        >
          See less
        </Button>
      )}
    </Card>
  );
}
