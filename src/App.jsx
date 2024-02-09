import Cards from "./components/Cards"
import Navbar from "./components/Navbar"
import EventTimer from "./components/EventImer"
import "./assets/styles/app.css"
import { Routes, Route, useNavigate } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import AboutUs from "./components/AboutUs"
import MainRoutes from "./components/MainRoutes"
import { useSelector, useDispatch } from "react-redux"
import Event from "./components/Event"
import Footer from "./components/Footer"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import { useEffect, useState } from "react"
import { setCurrentPage } from "./Features/NavigationSlice"
import ErrorPage from "./Pages/ErrorPage"
import AdminRoutes from "./admin/AdminRoutes"
import DirectAccess from "./components/DirectAccess"
import axios from "axios"
export default function App() {
  const role = useSelector((state) => state.AuthReducer.role)

  axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`

    return config
  })
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={
            <DirectAccess type={"login"}>
              <Login />
            </DirectAccess>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/page/*" element={<MainRoutes />} />
        <Route path="/401" element={<ErrorPage code="401" />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<ErrorPage code="404" />} />
      </Routes>
    </div>
  )
}
