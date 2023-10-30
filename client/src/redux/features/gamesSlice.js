import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiUrl from '../../utils/ApiUrl';


//Initial state
const initialState = {
  games: [
    {
      date: '',
      schelude: '',
      teamHomeId: '',
      teamAwayId: '',
      fieldId: '',
      status: '',
    },
  ],
};

//Async Thunks

export const fetchGames = createAsyncThunk('games/fetchGames',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${ApiUrl}/games`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const responseData = await response.json();
      return responseData;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      state.games = action.payload;
    });
  },
});

//selectors
export const selectGames = (state) => state.games.games;

export default gamesSlice.reducer;