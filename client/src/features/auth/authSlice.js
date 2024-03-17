import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Link, useNavigate } from "react-router-dom";

// This auth slice will handle login/register/updateUser/forgotPass ...

// status is needed for loading text /  showing error
const initialState = {
  status: "idle",
  error: "",
  currentUser: "",
};

const successReducer = (state, action) => {
  let response = action.payload;
  if (!response.success) {
    state.status = "error";
    state.error = response.message;
    state.currentUser = null;
    return;
  }
  state.status = "success";
  state.error = null;
  state.currentUser = action.payload.userName;
  // redirect to somewhere ? but this is a common reducer know
  // currently redirected after dispatch only
};

const loadingReducer = (state, action) => {
  state.status = "loading";
};

const failureReducer = (state, action) => {
  state.status = "error";
  state.error = action.payload.errors;
};

// as all major reducer going to async, let's user `createAsyncThunk` for handling every auth action
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, loadingReducer)
      .addCase(login.fulfilled, successReducer)
      .addCase(login.rejected, failureReducer)
      .addCase(signup.pending, loadingReducer)
      .addCase(signup.fulfilled, successReducer)
      .addCase(signup.rejected, failureReducer);
  },
});

// create thunks for async process like login / register
export const login = createAsyncThunk("auth/login", async (formData) => {
  // **** this await function dont need to be wrap in try catch, as it is handled by thunk only
  // if something goes wrong the thunk will return an error

  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  // doubt: do we have to convert and return ?
  const data = await res.json();
  return data;
});

export const signup = createAsyncThunk("auth/signup", async (formData) => {
  const rawResponse = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const response = await rawResponse.json();
  console.log(response);
  return response;
});

// selector functions
export const selectStatus = (state) => state.auth.status;
export const selectError = (state) => state.auth.error;
export const selectUser = (state) => state.auth.currentUser;

export const selectIsLoading = (state) => state.auth.status === "loading";

export default authSlice.reducer;
