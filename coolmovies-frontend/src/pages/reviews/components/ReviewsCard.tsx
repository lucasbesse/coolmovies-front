import { Card, CardContent, Avatar, Typography, Box, Rating, Button } from "@mui/material";
import { MovieReview } from "../../../generated/graphql";
import { useState, useRef, useEffect } from "react";
import { styles } from "../../style";

type Props = {
  review: MovieReview;
};

export default function ReviewCard({ review }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [shouldShowSeeMore, setShouldShowSeeMore] = useState(false);

  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      const el = textRef.current;

      const fullHeight = el.scrollHeight;

      const maxCollapsedHeight = 160;

      setShouldShowSeeMore(fullHeight > maxCollapsedHeight);
    }
  }, [review.body]);

  return (
    <Card
      sx={styles.reviewCard}
    >
      <Rating value={review.rating ?? 0} precision={0.5} readOnly size="small" sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar src={`https://i.pravatar.cc/150?u=${review.id}`} sx={{ width: 48, height: 48, mr: 1 }} />

        <Box sx={{ textAlign: "left" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
            {review.userReviewer?.name || "Anonymous"}
          </Typography>

          <Typography variant="caption" sx={{ color: "gray" }}>
            @username
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="h6"
        sx={styles.reviewTitle(expanded)}
      >
        {review.title}
      </Typography>
      <Typography
        ref={textRef}
        sx={styles.reviewText(expanded)}
      >
        {review.body}
      </Typography>

      {shouldShowSeeMore && (
        !expanded ? (
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
        )
      )}
    </Card>
  );
}
