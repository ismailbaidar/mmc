import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentPage: "Home",
}

const NavigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload
    },
  },
})

export default NavigationSlice.reducer
export const { setCurrentPage } = NavigationSlice.actions
