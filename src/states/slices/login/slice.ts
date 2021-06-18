import { createSlice } from '@reduxjs/toolkit';
import { name, LoginState } from '.';

const initialState: LoginState = {
  userName: 'jho2301',
};

const loginSlice = createSlice({
  name,
  initialState,
  reducers: {},
});

export const { actions: loginAction } = loginSlice;

export default loginSlice.reducer;
