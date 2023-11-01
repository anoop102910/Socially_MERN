import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialState = {
  isAuthenticated: false,
  userId: null,
  username: null,
  profileImage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuthentication: state => {
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          state.isAuthenticated = false;
          state.user = null;
          localStorage.removeItem("token");
        } else {
          state.isAuthenticated = true;
          state.userId = decodedToken.userId;
          state.username = decodedToken.name;
          if (decodedToken.profileImage) state.profileImage = decodedToken.profileImage;
        }
      } else {
        state.isAuthenticated = false;
        state.userId = null;
        state.username = null;
        state.profileImage = null;
      }
    },
    logout: state => {
      state.isAuthenticated = false;
      state.username = null;
      state.profileImage = null;
      state.userId = null;
      localStorage.removeItem("token");
    },
  },
});

export const { checkAuthentication, logout } = authSlice.actions;
export const authReducer =  authSlice.reducer;
