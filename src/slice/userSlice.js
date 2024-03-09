import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const initialState = {
  users: [],
  currentUser: null,
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchUsersNotFollowed = createAsyncThunk(
  "users/fetchUsersNotFollowed",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/user/not-followed");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchMoreUsers = createAsyncThunk(
  "users/fetchMoreUsers",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/user?limit=${limit}&page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/user/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const followUser = createAsyncThunk(
  "users/followUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/follower/follow/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/follower/unfollow/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.error.message;
      })
      .addCase(followUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(followUser.fulfilled, (state, action) => {
        const userId = action.payload;
        const followedUser = state.users.find(user => user._id === userId);
        followedUser.followedByCurrentUser = true;
        state.status = "success";
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.error.message;
      })
      .addCase(unfollowUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        const userId = action.payload;
        const unfollowedUser = state.users.find(user => user._id === userId);
        unfollowedUser.followedByCurrentUser = false;
        state.status = "success";
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.error.message;
      });
  },

});

export const { reducer: userReducer } = userSlice;
