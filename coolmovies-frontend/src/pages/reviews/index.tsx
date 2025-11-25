import { useGetReviewsQuery, MovieReview } from "../../generated/graphql";
import ReviewsList from "./components/ReviewsList";

export default function ReviewsPage() {
  const { data, loading, error } = useGetReviewsQuery();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar reviews.</div>;

  const reviews = (data?.allMovieReviews?.nodes ?? []).filter(
    (review): review is MovieReview => review !== null
  );

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <p style={{ color: "gray", marginBottom: 4 }}>Testimonial</p>
      <h1 style={{ marginBottom: 40 }}>Transformative Client Experiences</h1>
      <ReviewsList reviews={reviews} />
    </div>
  );
}
