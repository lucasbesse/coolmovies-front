import { useState } from "react";
import {
  useGetReviewsQuery,
  useGetMoviesQuery,
  MovieReview,
  Movie,
  useCreateReviewMutation,
  useGetCurrentUserQuery
} from "../../generated/graphql";
import MoviesList from "../../features/example/components/movies/MoviesList";
import ReviewsList from "./components/ReviewsList";
import MoviesSmallCard from "../../features/example/components/movies/MovieSmallCard";
import AddReviewModal from "./components/AddReviewModal";
import { selectMovie, clearSelectedMovie } from "../../state/reviews/reviewsSlice";
import { RootState } from "../../state/store";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function ReviewsPage() {
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const selectedMovie = useSelector((state: RootState) => state.reviews.selectedMovie);

  const moviesQuery = useGetMoviesQuery();
  const reviewsQuery = useGetReviewsQuery();
  const { data: userData } = useGetCurrentUserQuery();
  const [createReview] = useCreateReviewMutation();

  if (moviesQuery.loading || reviewsQuery.loading) return <div style={{width: '100%', textAlign: 'center', marginTop: 4}}>Loading...</div>;
  if (moviesQuery.error || reviewsQuery.error) return <div>Error loading data.</div>;

  const movies = (moviesQuery.data?.allMovies?.nodes ?? []).filter(
    (m): m is Movie => m !== null
  );

  const allReviews = (reviewsQuery.data?.allMovieReviews?.nodes ?? []).filter(
    (r): r is MovieReview => r !== null
  );

  const filteredReviews = selectedMovie ? allReviews.filter(
    (r) => r.movieByMovieId?.id === selectedMovie.id
  ): [];

  function getAverageRating(movieId: string) {
    const reviewsForMovie = allReviews.filter(r => r.movieByMovieId?.id === movieId);

    if (reviewsForMovie.length === 0) return 0;

    const sum = reviewsForMovie.reduce((acc, r) => acc + (r.rating ?? 0), 0);
    console.log("average", (sum / reviewsForMovie.length));
    return Number((sum / reviewsForMovie.length).toFixed(1));
  }

  async function handleCreateReview({
    title,
    body,
    rating,
  }: {
    title: string;
    body: string;
    rating: number;
  }) {
    if (!userData?.currentUser) return;

    try {
      await createReview({
        variables: {
          movieId: selectedMovie?.id,
          title,
          body,
          rating,
          userReviewerId: userData.currentUser.id,
        },
      });

      reviewsQuery.refetch();

    } catch (error) {
      console.error("Error creating review", error);
    }
  }

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
          <Button
            onClick={() => dispatch(clearSelectedMovie())}
            variant="text"
            startIcon={<i className="fa-solid fa-arrow-left"></i>}
            sx={{ fontSize: "18px" }}
          >
          </Button>
        )}
        <h1 style={{ margin: 0 }}>{selectedMovie ? <>Reviews <span style={{ color: "#afadadff", fontSize: "26px" }}>({filteredReviews.length})</span></> : "Available Movies"}</h1>
      </div>

      {!selectedMovie && (
        <MoviesList movies={movies} onSelect={(movie) => dispatch(selectMovie(movie))} getAverageRating={getAverageRating} />
      )}

      {selectedMovie && (
        <div style={{animation: "fadein 0.4s ease"}}>
          <MoviesSmallCard selectedMovie={selectedMovie} getAverageRating={getAverageRating}/>
          <div style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '20px 0'}}>
            <Button
              onClick={() => setOpenModal(true)}
              variant="contained"
              size="large"
            >
            + Add Review
            </Button>
          </div>
          <ReviewsList reviews={filteredReviews} />
        </div>
      )}

      <AddReviewModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={(data) => handleCreateReview(data)}
      />
      
    </div>
  );
}
