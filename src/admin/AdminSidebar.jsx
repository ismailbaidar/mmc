import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import "../assets/styles/admin-sidebar.css"
import {
  faCalendar,
  faChevronLeft,
  faChevronRight,
  faClock,
  faList,
  faMicrophone,
  faPersonChalkboard,
  faRightFromBracket,
  faTableColumns,
  faUsers,
  faHandshakeAngle,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setAdminCurrentPage, setPaths } from "../Features/AdminNavigationSlice"
import { logout } from "../Features/AuthSlice"
export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const page = useSelector((state) => state.AdminNavigationReducer.currentPage)
  const dispatch = useDispatch()
  return (
    <div
      className="admin-sidebar"
      style={{
        width: isCollapsed ? "90px" : "300px",
      }}
    >
      <button
        className="hide-button"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <FontAwesomeIcon icon={faChevronRight} />
        ) : (
          <FontAwesomeIcon icon={faChevronLeft} />
        )}
      </button>
      <div className="upper-part">
        <div className="logo-part" data-collaped={isCollapsed}>
          <Link to="/">
            {" "}
            <img
              src={
                isCollapsed
                  ? "/../Images/logo-only.png"
                  : "/../Images/1702198475838.png"
              }
              width={isCollapsed ? 30 : 100}
              alt=""
            />
          </Link>
        </div>
        <ul className="navigation-part">
          <Link to="">
            <li
              className="navigation-item"
              data-current-page={"dashboard" == page}
            >
              {" "}
              <FontAwesomeIcon icon={faTableColumns} />{" "}
              {!isCollapsed && <span>Dashboard</span>}
            </li>
          </Link>
          <Link to="/admin/events" onClick={() => {}}>
            <li
              className="navigation-item"
              data-current-page={"events" == page}
            >
              <FontAwesomeIcon icon={faMicrophone} />{" "}
              {!isCollapsed && <span>Events</span>}
            </li>
          </Link>
          <Link to="/admin/sessions" onClick={() => {}}>
            <li
              className="navigation-item"
              data-current-page={"session" == page}
            >
              <FontAwesomeIcon icon={faClock} />{" "}
              {!isCollapsed && <span>Sessions</span>}
            </li>
          </Link>
          <Link to="/admin/categories" onClick={() => {}}>
            <li
              className="navigation-item"
              data-current-page={"category" == page}
            >
              <FontAwesomeIcon icon={faList} />{" "}
              {!isCollapsed && <span>Categories</span>}
            </li>
          </Link>
          <Link to="/admin/targetAudience" onClick={() => {}}>
            <li
              className="navigation-item"
              data-current-page={"target audience" == page}
            >
              <FontAwesomeIcon icon={faUsersViewfinder} />{" "}
              {!isCollapsed && <span>Target audience</span>}
            </li>
          </Link>
          <Link to="/admin/speakers" onClick={() => {}}>
            <li
              className="navigation-item"
              data-current-page={"speakers" == page}
            >
              <FontAwesomeIcon icon={faPersonChalkboard} />{" "}
              {!isCollapsed && <span>Speakers</span>}
            </li>
          </Link>{" "}
          {/* <Link to="/admin/Users" onClick={() => {}}>
            <li className="navigation-item" data-current-page={"users" == page}>
              <FontAwesomeIcon icon={faUsers} />{" "}
              {!isCollapsed && <span>Users</span>}
            </li>
          </Link> */}
          <Link to="/admin/sponsor" onClick={() => {}}>
            <li
              className="navigation-item"
              data-current-page={"sponsor" == page}
            >
              <FontAwesomeIcon icon={faHandshakeAngle} />{" "}
              {!isCollapsed && <span>Sponsor</span>}
            </li>
          </Link>
        </ul>
      </div>
      <button className="logout" onClick={() => dispatch(logout())}>
        <FontAwesomeIcon icon={faRightFromBracket} />
        <span>{!isCollapsed && "Logout"}</span>
      </button>
    </div>
  )
}
