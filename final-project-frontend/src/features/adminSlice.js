import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



 const initialState = {
    games: [],
    isLoading: false,
    error: ''
}

export const fetchGames = createAsyncThunk("games/allGames", () =>
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((json => console.log(json)))
    .catch((e) => console.log(e))
);

const adminSlice = createSlice({
    name: 'games',
    initialState,
    reducers:{},
    extraReducers:(bulider)=>{
        bulider
        .addCase(fetchGames.fulfilled, (state, action) => {
          state.isLoading = false;
          state.games = action.payload
        })
        .addCase(fetchGames.pending, (state, action)=>{
            state.isLoading = true;
            state.error = ''
        })
        .addCase(fetchGames.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.error.message ?? 'Something went Wrong Please Check your Server'
            state.games = []
        })
        
    }
})

export default adminSlice.reducer