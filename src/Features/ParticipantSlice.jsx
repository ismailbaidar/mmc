import { createDateStrForInputFromSections } from "@mui/x-date-pickers/internals"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = []

export const addParticipant = createAsyncThunk(
  "participant/addParticipant",
  async () => {
    return axios.post(
      "http://mmc-participant-speaker.azurewebsites.net/api/Participant/AddParticipant"
    )
  }
)
const ParticipantSlice = createSlice({
  name: "participant",
  initialState,
  extraReducers: ({ addCase }) => {},
})
