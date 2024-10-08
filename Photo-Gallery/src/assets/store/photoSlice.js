import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch photos from Unsplash API
export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async () => {
    const response = await axios.get('https://api.unsplash.com/photos/random?count=10&client_id=YOUR_ACCESS_KEY');
    return response.data;
});

// Create a slice of the store
const photosSlice = createSlice({
    name: 'photos',
    initialState: {
        photos: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        // You can add more reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhotos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPhotos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Add fetched photos to the state
                state.photos = action.payload;
                // Save to local storage
                localStorage.setItem('photos', JSON.stringify(action.payload));
            })
            .addCase(fetchPhotos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// Export the async thunk
export { fetchPhotos };

// Export the reducer
export default photosSlice.reducer;
