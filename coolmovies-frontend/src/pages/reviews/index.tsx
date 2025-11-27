import { useEffect, useState } from "react";
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
import { Button, Typography } from "@mui/material";
import { useAppDispatch } from "../../state";
import { loadingActions } from "../../state/loading.slice";

export default function ReviewsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const moviesQuery = useGetMoviesQuery();
  const reviewsQuery = useGetReviewsQuery();
  const { data: userData } = useGetCurrentUserQuery();
  const [createReview] = useCreateReviewMutation();

  const dispatch = useAppDispatch();

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
      dispatch(loadingActions.show());
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
    } finally {
      dispatch(loadingActions.hide());
    }
  }

  useEffect(() => {
    const isLoading = moviesQuery.loading || reviewsQuery.loading;

    if (isLoading) {
      dispatch(loadingActions.show());
    } else {

      //Here I added a small timeout just to show the loading overlay for a bit
      setTimeout(() =>{
        dispatch(loadingActions.hide());
      }, 600)
      
    }
  }, [moviesQuery.loading, reviewsQuery.loading, dispatch]);

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
            onClick={() => setSelectedMovie(null)}
            variant="text"
            startIcon={<i className="fa-solid fa-arrow-left"></i>}
            sx={{ fontSize: "18px" }}
          >
          </Button>
        )}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Typography
            variant="h4"
            sx={{ mb: 1 }}
          >
            {selectedMovie ? (
              <>
                Reviews{" "}
                <span style={{ color: "#afadadff", fontSize: "26px" }}>
                  ({filteredReviews.length})
                </span>
              </>
            ) : (
              "Available Movies"
            )}
          </Typography>
          {!selectedMovie && (
            <Typography>
              Click on the movie cards to see reviews!
            </Typography>
          )}
        </div>
      </div>

      {!selectedMovie && (
        <MoviesList movies={movies} onSelect={(movie) => setSelectedMovie(movie)} getAverageRating={getAverageRating} />
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
