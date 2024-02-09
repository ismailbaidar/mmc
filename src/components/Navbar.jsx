import "../assets/styles/navbar.css"
import { useSelector, useDispatch } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { setCurrentPage } from "../Features/NavigationSlice"
import { Logout } from "@mui/icons-material"
import { logout } from "../Features/AuthSlice"
export default function Navbar() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.AuthReducer.token)
  const username = useSelector((state) => state.AuthReducer.username)
  const role = useSelector((state) => state.AuthReducer.role)
  console.log(username, "username")
  const page = useSelector((state) => {
    return state.NavigationReducer.currentPage
  })

  const [navActionToggle, setNavActionToggle] = useState(false)
  useEffect(() => {
    console.log(page)
  }, [page])
  return (
    <nav className="shadow-md  flex align-center text-white  justify-between">
      <Link
        className="text-black logo-holder"
        to="/"
        onClick={() => dispatch(setCurrentPage("Home"))}
      >
        <img src="/../Images/white-text-logo2.png" width={100} alt="" />
      </Link>

      <ul className=" align-center justify-center  text-black nav-links flex gap-3">
        <li data-current={page == "Home"}>
          <Link onClick={() => dispatch(setCurrentPage("Home"))} to="/">
            Home
          </Link>
        </li>
        <li data-current={page == "Events"}>
          <Link
            onClick={() => dispatch(setCurrentPage("Events"))}
            to="/page/events"
          >
            Events
          </Link>
        </li>
        <li
          data-current={page == "Speakers"}
          onClick={() => dispatch(setCurrentPage("Speakers"))}
        >
          <Link
            onClick={() => dispatch(setCurrentPage("Events"))}
            to="/page/speakers"
          >
            Speakers
          </Link>
        </li>
        <li
          data-current={page == "About"}
          onClick={() => dispatch(setCurrentPage("About"))}
        >
          <Link onClick={() => dispatch(setCurrentPage("Events"))} to="About">
            About
          </Link>
        </li>
      </ul>
      {token == null ? (
        <div className="authentication-buttons">
          <button className="sign-in">
            <Link to="/login">Sign in</Link>
          </button>
          <button className="sign-up">
            <Link to="/register">Sign Up</Link>
          </button>
        </div>
      ) : (
        <div className="profile">
          <div
            className="username cursor-pointer"
            onClick={() => setNavActionToggle(!navActionToggle)}
          >
            <div className="profile-circle">
              <span className="profile-letter">
                {username[0].toUpperCase()}
              </span>
            </div>
          </div>
          {navActionToggle && (
            <ul>
              <li className="cursor-pointer">Profile</li>
              {role == "Admin" && (
                <li className="cursor-pointer">
                  <Link to="/admin">Dashboard</Link>
                </li>
              )}
              <li className="cursor-pointer" onClick={() => dispatch(logout())}>
                Logout
              </li>
            </ul>
          )}
        </div>
      )}
    </nav>
  )
}
