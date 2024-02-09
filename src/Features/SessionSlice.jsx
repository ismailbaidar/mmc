import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  sessions: [],
  loading: false,
}

export const getAllSession = createAsyncThunk(
  "session/getAllSessions",
  async () => {
    return axios
      .get(
        "https://mmc-event-session.azurewebsites.net/api/v1/Session/GetSessions"
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  }
)

export const addSession = createAsyncThunk(
  "session/getAllSessions",
  async (data) => {
    return axios
      .post(
        "https://mmc-event-session.azurewebsites.net/api/v1/Session/CreateSession",
        data
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  }
)

export const updateSession = createAsyncThunk(
  "session/getAllSessions",
  async () => {
    return axios
      .get(
        "https://mmc-event-session.azurewebsites.net/api/v1/Session/GetSessions"
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  }
)

export const deleteSession = createAsyncThunk(
  "session/deleteSession",
  async (id) => {
    return axios
      .delete(
        "https://mmc-event-session.azurewebsites.net/api/v1/Session/Romove/" +
          id
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  }
)

const SessionSlice = createSlice({
  name: "session",
  initialState,
  extraReducers: ({ addCase }) => {
    addCase(getAllSession.fulfilled, (state, { payload }) => {
      state.sessions = payload
      state.loading = false
    })
    addCase(getAllSession.rejected, (state, { payload }) => {
      state.sessions = payload
      state.loading = false
    })
    addCase(getAllSession.pending, (state, { payload }) => {
      state.sessions = payload
      state.loading = true
    })
  },
})

export default SessionSlice.reducer
