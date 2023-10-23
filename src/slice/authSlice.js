import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const initialState = {
  isAuthenticated: false,
  userId: null,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuthentication: state => {
      const token = Cookies.get("token");
    //   console.log(token);

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log(decodedToken);
          if (decodedToken) {
            state.isAuthenticated = true;
            state.userId = decodedToken.userId;
            state.username = decodedToken.name;
            if(decodedToken.profileImage) state.profileImage = decodedToken.profileImage
          }
        } catch (error) {
          Cookies.remove("token");
        }
      }
    },
    logout: state => {
      state.isAuthenticated = false;
      state.userId = null;
      state.username = null;
      state.profileImage = null;
      Cookies.remove("token");
    },
  },
});

export const { checkAuthentication, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
