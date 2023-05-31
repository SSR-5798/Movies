import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url:{},
    genres:{}
}

const homeSlice = createSlice({
    name:"home",
    initialState,
    reducers:{
      getConfigurationURL :  (state, action) => {
          state.url = action.payload;
      },

      getGenres : (state, action) => {
        state.genres = action.payload;
      }
    }
})

export default homeSlice.reducer;

export const { getConfigurationURL, getGenres } = homeSlice.actions;