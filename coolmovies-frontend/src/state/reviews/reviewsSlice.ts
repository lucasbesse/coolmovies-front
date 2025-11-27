import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../generated/graphql";

interface ReviewsState {
  selectedMovie: Movie | null;
}

const initialState: ReviewsState = {
  selectedMovie: null,
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    selectMovie(state, action: PayloadAction<Movie>) {
      state.selectedMovie = action.payload;
    },
    clearSelectedMovie(state) {
      state.selectedMovie = null;
    },
  },
});

export const { selectMovie, clearSelectedMovie } = reviewsSlice.actions;
export default reviewsSlice.reducer;
