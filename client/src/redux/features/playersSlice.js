import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiUrl from '../../utils/ApiUrl';


//Initial state
const initialState = {
  players: [
    {
      name: '',
      phone: '',
      position: '',
      imagen: '',
      teamid: '',
    },
  ],
};

//Async Thunks

export const fetchPlayers = createAsyncThunk('players/fetchPlayers',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${ApiUrl}/players`, {
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

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlayers.fulfilled, (state, action) => {
      state.players = action.payload;
    });
  },
});

//selectors
export const selectPlayers = (state) => state.players.players;

export default playersSlice.reducer;
