import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async thunk to fetch photos from Unsplash API
const fetchPhotos = createAsyncThunk("photos/fetchPhotos", async () => {
  const response = await axios.get(
    "https://api.unsplash.com/photos/random?count=25&client_id=SP5EU6iJK5BbeNMVb0pUBrEE383PScLo8IQkiGwhrfw"
  );
  return response.data;
});

// create a slice of the store
const photosSlice = createSlice({
  name: "photos",
  initialState: {
    photos: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // might add more reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = "succeeded";
        // add fetched photos to the state
        state.photos = action.payload;
        // save to local storage
        localStorage.setItem("photos", JSON.stringify(action.payload));
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export the async thunk
export { fetchPhotos };

// export the reducer
export default photosSlice.reducer;
