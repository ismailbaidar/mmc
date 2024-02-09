import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  subCategories: [],
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    return axios
      .get(
        "https://mmc-parametrage-session.azurewebsites.net/api/Category/GetAllCategories"
      )
      .then((res) => res.data);
  }
);

export const getSubCategories = createAsyncThunk(
  "categories/getSubCategories",
  async () => {
    return axios
      .get(
        "https://mmc-parametrage-session.azurewebsites.net/api/SubCategory/GetAllSubCategories"
      )
      .then((res) => res.data);
  }
);

export const updateSubCategory = createAsyncThunk(
  "categories/updateSubCategory",
  async (data) => {
    return axios
      .put(
        "https://mmc-parametrage-session.azurewebsites.net/api/SubCategory/UpdateSubCategory",
        data
      )
      .then((res) => res.data);
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (data) => {
    return axios
      .post(
        "https://mmc-parametrage-session.azurewebsites.net/api/Category/CreateCategory",
        data
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
);

export const addSubCategory = createAsyncThunk(
  "categories/addSubCategory",
  async (data) => {
    return axios
      .post(
        "https://mmc-parametrage-session.azurewebsites.net/api/SubCategory/CreateSubCategory",
        data
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
);

export const deleteSubCategory = createAsyncThunk(
  "categories/deleteSubCategory",
  async (data) => {
    return axios
      .delete(
        "https://mmc-parametrage-session.azurewebsites.net/api/SubCategory/DeleteSubCategory/" +
          data,
        data
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
    });
    builder.addCase(getSubCategories.fulfilled, (state, { payload }) => {
      state.subCategories = payload;
    });
  },
});

export default categorySlice.reducer;
