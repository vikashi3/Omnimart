import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  isLoggedIn: false,
  accountType: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const token = action.payload;
      const decoded = jwtDecode(token);
      state.isLoggedIn = true;
      state.accountType = decoded.user.accountType;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.accountType = '';
      localStorage.removeItem('token');
    },
    setAuthFromToken(state) {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        state.accountType = decoded.user.accountType;
        state.isLoggedIn = true;
      }
    },
  },
});

export const { login, logout, setAuthFromToken } = authSlice.actions;

export default authSlice.reducer;
