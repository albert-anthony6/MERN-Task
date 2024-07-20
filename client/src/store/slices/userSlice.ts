import agent from '../../api/agent';
import { router } from '../../routes/router';
import { CurrentUser, AuthUserFormValues } from '../../utils/interfaces/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface UserState {
  currentUser: CurrentUser | null;
  token: string | null;
}

const initialState: UserState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser') as string) || null,
  token: localStorage.getItem('jwt') || null
};

export const register = createAsyncThunk<CurrentUser, AuthUserFormValues>(
  'user/register',
  async (user, thunkAPI) => {
    try {
      const response = await agent.Account.register(user);
      thunkAPI.dispatch(setToken(response.token));
      router.navigate('/');
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem('jwt', action.payload);
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.currentUser = null;
      localStorage.removeItem('jwt');
      localStorage.removeItem('currentUser');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.currentUser = null;
      });
  }
});

export const { setToken, logout } = userSlice.actions;
export default userSlice.reducer;
