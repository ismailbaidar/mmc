import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentPage: "dashboard",
  paths: ["Dashboard"],
}

const AdminNavigationSlice = createSlice({
  name: "adminNavigation",
  initialState,
  reducers: {
    setAdminCurrentPage: (state, { payload }) => {
      state.currentPage = payload
    },
    setPaths: (state, { payload }) => {
      state.paths = payload
    },
  },
})

export default AdminNavigationSlice.reducer
export const { setAdminCurrentPage, setPaths } = AdminNavigationSlice.actions
