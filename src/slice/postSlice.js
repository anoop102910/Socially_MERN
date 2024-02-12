import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

const initialState = {
  posts: [],
  status: "idle",
  createPostStatus:"idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/api/post");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createPost = createAsyncThunk("posts/createPost", async (postData, { rejectWithValue }) => {
  try {
    console.log(postData);
    const response = await api.post("/api/post", postData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (postId, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/post/${postId}`);
    console.log(response.data);
    return postId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updatePost = createAsyncThunk("posts/updatePost", async (postData, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/posts/${postData.id}`, postData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const likePost = createAsyncThunk("posts/likePost", async (postId, { rejectWithValue }) => {
  try {
    const response = await api.post(`/api/post/like/${postId}`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
export const unLikePost = createAsyncThunk("posts/unLikePost", async (postId, { rejectWithValue }) => {
  try {
    const response = await api.post(`/api/post/unlike/${postId}`);
    console.log(response.data?.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.message);
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state, action) => {
        state.createPostStatus = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.createPostStatus = "success";
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createPostStatus = "failure";
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = state.posts.filter(post => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failure";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const existingPost = state.posts.find(post => post.id === updatedPost.id);
        if (existingPost) {
          existingPost.title = updatedPost.title;
          existingPost.body = updatedPost.body;
        }
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.posts.find(post => post._id === action.payload.postId);
        post.like.push(action.payload);
      })
      .addCase(unLikePost.fulfilled, (state, action) => {
        const post = state.posts.find(post => post._id === action.payload.postId);
        console.log(post);
        post.like = post.like.filter(likedBy => likedBy._id != action.payload._id);
      });
  },
});

export const postReducer = postSlice.reducer;
