import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from '../../services/apiUser';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const data = await getCurrentUser();
  return data;
});

const initialState = {
  user: null,
  status: 'pending', //pending or idle or error
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.status = 'idle';
      state.error = '';
    },
    addUserAddress: (state, action) => {
      state.user = { ...state.user, locations: action.payload };
      state.status = 'idle';
      state.error = '';
    },
    updateUserAddress: (state, action) => {
      state.user = { ...state.user, locations: action.payload };
      state.status = 'idle';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = 'pending';
      state.user = null;
      state.error = '';
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = 'idle';
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
      state.user = null;
    });
  },
});

export default userSlice.reducer;

export const { updateUserProfile, addUserAddress, updateUserAddress } =
  userSlice.actions;

export const selectUser = (state) => state.user;
