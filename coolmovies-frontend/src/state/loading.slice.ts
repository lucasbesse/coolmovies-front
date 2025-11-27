import { createSlice } from "@reduxjs/toolkit";

type LoadingState = {
  open: boolean;
};

const initialState: LoadingState = {
  open: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    show: (state) => {
      state.open = true;
    },
    hide: (state) => {
      state.open = false;
    },
    set: (state, action) => {
      state.open = action.payload;
    }
  }
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;
