import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './features/playersSlice';
import teamsReducer from './features/teamsSlice';
import gamesReducer from './features/gamesSlice';
import fieldsReducer from './features/fieldsSlice';


const store = configureStore({
  reducer: {
    players: playersReducer,
    teams: teamsReducer,
    games: gamesReducer,
    fields: fieldsReducer,
  },
});

export default store;