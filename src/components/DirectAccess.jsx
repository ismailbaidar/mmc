import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import Login from "../Pages/Login"
import { useEffect } from "react"

export default function DirectAccess({ type, children }) {
  const token = useSelector((state) => state.AuthReducer.token)
  useEffect(() => {
    console.log("this is the token  ", token)
  }, [token])

  return type == "login" ? (
    token == null ? (
      children
    ) : (
      <Navigate to="/" />
    )
  ) : token != null ? (
    children
  ) : (
    <Login />
  )
}
