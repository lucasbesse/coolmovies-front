import { useState } from "react";
import {
  useGetReviewsQuery,
  useGetMoviesQuery,
  MovieReview,
  Movie,
} from "../../generated/graphql";
import MoviesList from "../../features/example/components/movies/MoviesList";
import ReviewsList from "./components/ReviewsList";
import MoviesSmallCard from "../../features/example/components/movies/MovieSmallCard";

export default function ReviewsPage() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const moviesQuery = useGetMoviesQuery();
  const reviewsQuery = useGetReviewsQuery();

  if (moviesQuery.loading || reviewsQuery.loading) return <div>Loading...</div>;
  if (moviesQuery.error || reviewsQuery.error) return <div>Error loading data.</div>;

  const movies = (moviesQuery.data?.allMovies?.nodes ?? []).filter(
    (m): m is Movie => m !== null
  );

  const allReviews = (reviewsQuery.data?.allMovieReviews?.nodes ?? []).filter(
    (r): r is MovieReview => r !== null
  );

  function getAverageRating(movieId: string) {
    const reviewsForMovie = allReviews.filter(r => r.movieByMovieId?.id === movieId);

    if (reviewsForMovie.length === 0) return 0;

    const sum = reviewsForMovie.reduce((acc, r) => acc + (r.rating ?? 0), 0);
    console.log("average", (sum / reviewsForMovie.length));
    return Number((sum / reviewsForMovie.length).toFixed(1));
  }


  const filteredReviews = selectedMovie
    ? allReviews.filter((r) => r.movieByMovieId?.id === selectedMovie.id)
    : [];

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <div
        style={{
          position: "relative",
          marginBottom: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedMovie && (
          <button
            onClick={() => setSelectedMovie(null)}
            style={{
              position: "absolute",
              left: 0,
              padding: "12px 24px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
              backgroundColor: "#8ca5e2ff",
              color: "white",
            }}
          >
           Back
          </button>
        )}

        <h1 style={{ margin: 0 }}>{selectedMovie ? <>Reviews <span style={{ color: "#afadadff", fontSize: "26px" }}>({filteredReviews.length})</span></> : "Available Movies"}</h1>
      </div>

      {!selectedMovie && (
        <MoviesList movies={movies} onSelect={(movie) => setSelectedMovie(movie)} getAverageRating={getAverageRating} />
      )}

      {selectedMovie && (
        <>
          <MoviesSmallCard selectedMovie={selectedMovie} getAverageRating={getAverageRating}/>
          <ReviewsList reviews={filteredReviews} />
        </>
      )}
    </div>
  );
}
