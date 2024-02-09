import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const login = createAsyncThunk("auth/login", async (data) => {
  return axios
    .post("https://mmc-authentification.azurewebsites.net/api/Auth/Login", data)
    .then((response) => response.data)
    .catch((err) => err)
})

export const register = createAsyncThunk("auth/register", async (data) => {
  console.log(data)
  return axios
    .post(
      "https://mmc-authentification.azurewebsites.net/api/Auth/Register",
      data
    )
    .then((response) => console.log(response.data))
    .catch((err) => err)
})

export const loginByGoogle = createAsyncThunk(
  "auth/loginByGoogle",
  async (data) => {
    return axios
      .post(
        "https://mmc-authentification.azurewebsites.net/api/Auth/LoginWithGoogle",
        data
      )
      .then((response) => response.data)
      .catch((err) => err)
  }
)

export const registerByGoogle = createAsyncThunk(
  "auth/registerByGoogle",
  async (data) => {
    return axios
      .post(
        "https://mmc-authentification.azurewebsites.net/api/Auth/RegisterByGoogle",
        data
      )
      .then((response) => response.data)
      .catch((err) => err)
  }
)

export const getIdByEmail = createAsyncThunk(
  "auth/getIdByEmail",
  async (data) => {
    return axios
      .get(
        "https://mmc-authentification.azurewebsites.net/api/UserData/getIdByEmail/" +
          data
      )
      .then((response) => response.data)
      .catch((err) => err)
  }
)

export const addParticipant = createAsyncThunk(
  "auth/addParticipant",
  async (data) => {
    return axios
      .post(
        "https://mmc-participant-speaker.azurewebsites.net/api/Participant/AddParticipant",
        data
      )
      .then((response) => response.data)
      .catch((err) => err)
  }
)

const initialState = {
  username: localStorage.getItem("username"),
  email: localStorage.getItem("email") ? localStorage.getItem("email") : null,
  token: localStorage.getItem("token"),
  "X-token": null,
  role: localStorage.getItem("role") ? localStorage.getItem("role") : null,
  isLoading: false,
  success: false,
  error: false,
  fromLogout: false,
  id: null,
}

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, { payload }) => {
      state.token = null
      state.username = null
      state.email = null
      state.role = null
      state.id = null
      localStorage.clear()
      console.log("logged out")
      state.fromLogout = true
    },
    setFromLogout: (state, { payload }) => {
      state.setFromLogout = payload
    },
    setSuccess: (state) => {
      state.success = false
      state.error = false
      console.log("called")
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addParticipant.fulfilled, (state, { payload }) => {
      if (payload?.response?.status == 401) {
        state.error = true
      } else {
        state.success = true
      }
      state.isLoading = false
      console.log(state.token, state.id, "token")
    })
    builder.addCase(addParticipant.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(addParticipant.rejected, (state, { payload }) => {
      state.isLoading = false
      console.log(payload)
    })

    builder.addCase(getIdByEmail.fulfilled, (state, { payload }) => {
      state.id = payload
      console.log("id", payload)
      localStorage.setItem("id", payload)
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoading = false
      console.log(payload)
      if (payload.userName != undefined) {
        console.log(payload)
        localStorage.setItem("username", payload?.userName)
        localStorage.setItem("token", payload?.token)
        localStorage.setItem("email", payload?.email)
        payload?.roles.includes("Admin")
          ? localStorage.setItem("role", "Admin")
          : payload?.roles.includes("Speaker")
          ? localStorage.setItem("role", "Speaker")
          : payload?.roles.includes("User")
          ? localStorage.setItem("role", "User")
          : null

        state.token = payload.token
        state.role = localStorage.getItem("role")
        state.username = payload.userName
        localStorage.setItem("id", payload.id)
        state.id = payload.id
      }
      console.log(state.username)
    })
    builder.addCase(registerByGoogle.fulfilled, (state, { payload }) => {
      state.isLoading = false
      console.log(payload)
      if (payload.userName != undefined) {
        console.log(payload)
        localStorage.setItem("username", payload?.userName)
        localStorage.setItem("email", payload?.email)
        localStorage.setItem("token", payload?.token)
        payload?.roles.includes("Admin")
          ? localStorage.setItem("role", "Admin")
          : payload?.roles.includes("Speaker")
          ? localStorage.setItem("role", "Speaker")
          : payload?.roles.includes("User")
          ? localStorage.setItem("role", "User")
          : null

        state.token = payload.token
        state.role = localStorage.getItem("role")
        state.username = payload.userName
        state.id = payload.id
        localStorage.setItem("id", payload.id)

        console.log(payload)
      }
    })
    builder.addCase(login.pending, (state, { payload }) => {
      state.isLoading = true
    })

    builder.addCase(login.rejected, (state, { payload }) => {
      console.log(payload)
      state.isLoading = false
    })
    builder.addCase(loginByGoogle.fulfilled, (state, { payload }) => {
      state.isLoading = false
      console.log(payload)
      if (payload.userName != undefined) {
        console.log(payload)
        localStorage.setItem("username", payload?.userName)
        localStorage.setItem("token", payload?.token)
        localStorage.setItem("email", payload?.email)
        payload?.roles.includes("Admin")
          ? localStorage.setItem("role", "Admin")
          : payload?.roles.includes("Speaker")
          ? localStorage.setItem("role", "Speaker")
          : payload?.roles.includes("User")
          ? localStorage.setItem("role", "User")
          : null

        state.token = payload.token
        state.role = localStorage.getItem("role")
        state.username = payload.userName
        state.id = payload.id
        localStorage.setItem("id", payload.id)
      }
    })
    builder.addCase(loginByGoogle.pending, (state, { payload }) => {
      state.isLoading = true
    })

    builder.addCase(loginByGoogle.rejected, (state, { payload }) => {
      state.isLoading = false
    })
  },
})

export default AuthSlice.reducer
export const { logout, setFromLogout, setSuccess } = AuthSlice.actions
