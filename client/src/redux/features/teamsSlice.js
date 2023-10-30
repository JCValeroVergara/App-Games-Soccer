import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiUrl from '../../utils/ApiUrl';


//Initial state
const initialState = {
  teams: [
    {
      name: '',
      city: '',
      neighborhood: '',
      manager: '',
      managerPhone: '',
      image: '',
      players: [],
      homeGames: [],
      awayGames: [],
    },
  ],
};

//Async Thunks

export const fetchTeams = createAsyncThunk('teams/fetchTeams',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${ApiUrl}/teams`, {
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

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.teams = action.payload;
    });
  },
});

//selectors
export const selectTeams = (state) => state.teams.teams;

export default teamsSlice.reducer;