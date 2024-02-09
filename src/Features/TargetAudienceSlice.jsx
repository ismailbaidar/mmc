import {
  createSlice,
  createAsyncThunk,
  createActionCreatorInvariantMiddleware,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  targetAudiences: [],
};

export const getTargetAudiences = createAsyncThunk(
  "targetAudience/getTargetAudiences",
  async () => {
    return axios
      .get(
        "https://mmc-parametrage-session.azurewebsites.net//api/TargetAudience/GetAllTargetAudience"
      )
      .then((res) => res.data)
      .catch((err) => err);
  }
);

export const addTargetAudience = createAsyncThunk(
  "targetAudience/addTargetAudience",
  async (data) => {
    return axios
      .post(
        "https://mmc-parametrage-session.azurewebsites.net/api/TargetAudience/CreateTargetAudience/",
        data
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);

export const deleteTargetAudience = createAsyncThunk(
  "targetAudience/deleteTargetAudience",
  async (data) => {
    return axios
      .delete(
        "https://mmc-parametrage-session.azurewebsites.net/api/TargetAudience/DeleteTargetAudience/" +
          data
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);

export const updateTargetAudience = createAsyncThunk(
  "targetAudience/updateTargetAudience",
  async (data) => {
    return axios
      .put(
        "https://mmc-parametrage-session.azurewebsites.net/api/TargetAudience/UpdateTargetAudience",
        data
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);

const targetAudienceSlice = createSlice({
  name: "targetAudience",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTargetAudiences.fulfilled, (state, { payload }) => {
      state.targetAudiences = payload;
      console.log("done", payload);
    });
    builder.addCase(addTargetAudience.fulfilled, (state, { payload }) => {
      // state.targetAudiences = { payload };
    });
    builder.addCase(deleteTargetAudience.fulfilled, (state, { payload }) => {
      //
    });
  },
});

export default targetAudienceSlice.reducer;
