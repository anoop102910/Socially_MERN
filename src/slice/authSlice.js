import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { api } from "../api";

const initialState = {
  status: null,
  isAuthenticated: false,
  userId: null,
  username: null,
  profileImage: null,
};

export const checkAuthentication = createAsyncThunk("auth/checkAuthentication", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/check-cookie-validation");
    return response.data.message;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/logout");
    console.log(response);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(checkAuthentication.pending, state => {
        state.status = "loading";
      })
      .addCase(checkAuthentication.rejected, state => {
        state.status = "error";
      })
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.status = null;
        const data = action.payload;
        if (data) {
          try {
            state.isAuthenticated = true;
            state.userId = data.userId;
            state.username = data.name;
            if (data.profileImage) state.profileImage = data.profileImage;
            else state.profileImage = null
          } catch (error) {
            Cookies.remove("token");
          }
        }
      })
      .addCase(logout.pending, state => {
        state.status = "loading";
      })
      .addCase(logout.rejected, state => {
        state.status = "error";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = null;
        state.isAuthenticated = false;
        state.userId = null;
        state.username = null;
        state.profileImage = null;
      });
  },
});

export const authReducer = authSlice.reducer;
