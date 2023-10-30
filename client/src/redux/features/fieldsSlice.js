import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiUrl from '../../utils/ApiUrl';


//Initial state
const initialState = {
  fields: [
    {
      name: '',
      city: '',
      neighborhood: '',
      address: '',
      phone: '',
      image: '',
    },
  ],
};

//Async Thunks

export const fetchFields = createAsyncThunk('fields/fetchFields',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${ApiUrl}/fields`, {
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

export const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFields.fulfilled, (state, action) => {
      state.fields = action.payload;
    });
  },
});

//selectors
export const selectFields = (state) => state.fields.fields;

export default fieldsSlice.reducer;