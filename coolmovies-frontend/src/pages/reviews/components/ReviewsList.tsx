import { MovieReview } from "../../../generated/graphql";
import ReviewCard from "./ReviewsCard";

type Props = {
  reviews: MovieReview[];
};

export default function ReviewsList({ reviews }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        justifyContent: "center",
        paddingTop: 20,
        flexWrap: "wrap",
      }}
    >
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}

