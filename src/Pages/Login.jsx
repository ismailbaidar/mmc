import { Checkbox, FormControlLabel, TextField } from "@mui/material"
import "../assets/styles/form.css"
import SvgLogin from "../components/SvgLogin"
import { Link, useNavigate } from "react-router-dom"
import { getIdByEmail, login, loginByGoogle } from "../Features/AuthSlice"
import { useEffect, useReducer, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GoogleLogin } from "react-google-login"
import SimpleLoadingSpinner from "../components/simpleLoadingSpinner"
import axios from "axios"
import { gapi } from "gapi-script"
export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoading = useSelector((state) => state.AuthReducer.isLoading)
  const token = useSelector((state) => state.AuthReducer.token)
  const email = useRef()
  const password = useRef()
  function handleLogin() {
    console.log(email.current.value, password.current.value)
    dispatch(
      login({
        email: email.current.value,
        password: password.current.value,
      })
    )
  }
  useEffect(() => {
    if (token != null) {
      navigate("/")
    }
  }, [])

  const clientId =
    "201912823014-alq12a2d01h9t0a3k9q7vtfir277m9mr.apps.googleusercontent.com"
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,

        scope: "",
      })
    }
    gapi.load("client:auth2", start)
  }, [])

  const responseGoogle = async (response) => {
    dispatch(
      loginByGoogle({
        email: response.profileObj.email,
        loginProvider: "Google",
      })
    )
  }

  return (
    <>
      <div className="form-container">
        <div className="background bg-gradient-to-r from-sky-500 to-indigo-500">
          <SvgLogin />
        </div>
        <div className="form-elements">
          <span>
            <h1>Sign In</h1>
            <h2>
              Dont have an account ? <Link to="/register">Sign Up</Link>
            </h2>
          </span>
          <TextField label="Email" type="outlined" inputRef={email} />
          <TextField label="Password" type="password" inputRef={password} />
          <div className="checkbox">
            <Checkbox id="remember" />
            {/* <input type="checkbox" name="" id="" /> */}
            <label htmlFor="remember">Remember me ?</label>
          </div>
          <button
            className="position-relative"
            onClick={() => {
              handleLogin()
            }}
          >
            {isLoading ? <SimpleLoadingSpinner /> : "Login"}
          </button>

          <GoogleLogin
            className="google-sign-up-button"
            clientId="201912823014-alq12a2d01h9t0a3k9q7vtfir277m9mr.apps.googleusercontent.com"
            buttonText="Sign Up with Google"
            onSuccess={responseGoogle}
            // onFailure={responseGoogle}
          />

          <Link to="/" className="redirect-home">
            Back to home
          </Link>
        </div>
      </div>
    </>
  )
}
