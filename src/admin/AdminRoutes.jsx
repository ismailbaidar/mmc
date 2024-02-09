import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom"
import Dashboard from "./Dashboard"
import AdminSidebar from "./AdminSidebar"
import "../assets/styles/admin-routes.css"
import AdminEvents from "./AdminEvents"
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import CreateEventAdmin from "./CreateEventAdmin"
import AdminUsers from "./AdminUsers"
import CreateSpeakersAdmin from "./CreateSpeakersAdmin"
import CreateUsersAdmin from "./CreateUsersAdmin"
import EditUsersAdmin from "./EditUsersAdmin"
import EditSpeakersAdmin from "./EditSpeakersAdmin"
import EditEventAdmin from "./EditEventAdmin"
import AdminSpeakers from "./AdminSpeaker"
import AdminSessions from "./AdminSessions"
import CreateSessionPage from "./CreateSessionPage"
import AdminCategories from "./AdminCategories"
import CreateCategoryPage from "./CreateCategoryPage"
import EditSponsorAdmin from "./EditSponsorAdmin"
import AdminTargetAudience from "./AdminTargetAudience"
import CreateTargetAudience from "./CreateTargetAudience"
import EditTargetAudience from "./EditTargetAudience"
import CreateSponsorAdmin from "./CreateSponsorAdmin"
import EditcategoryPage from "./EditCategory"
import EditEvent from "./EditEvent"
import AdminSponsor from "./AdminSponsor"
export default function AdminRoutes() {
  const paths = useSelector((state) => state.AdminNavigationReducer.paths)
  const token = useSelector((state) => state.AuthReducer.role)
  const navigate = useNavigate()
  const role = useSelector((state) => state.AuthReducer.role)
  const fromLogout = useSelector((state) => state.AuthReducer.fromLogout)

  console.log(paths[0])
  return (
    <>
      {role == "Admin" ? (
        <div className="admin-section">
          <AdminSidebar />
          <div className="content">
            <div className="topbar">
              {paths.map((path, index) => {
                let allPaths = ""
                console.log(paths, path)

                return (
                  <>
                    <Link to={path == "Dashboard" ? "" : path}>{path}</Link>{" "}
                    {index == paths.length - 1 ? (
                      ""
                    ) : (
                      <FontAwesomeIcon
                        className="separator"
                        icon={faChevronRight}
                      />
                    )}
                  </>
                )
              })}
            </div>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="events/create" element={<CreateEventAdmin />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="events/:id" element={<EditEventAdmin />} />
              <Route path="users/create" element={<CreateUsersAdmin />} />
              <Route path="users" element={<AdminUsers />} />

              <Route path="sponsor" element={<AdminSponsor />} />

              <Route path="speakers/create" element={<CreateSpeakersAdmin />} />

              <Route path="speakers" element={<AdminSpeakers />} />

              <Route path="sponsor/edit/:id" element={<EditSponsorAdmin />} />

              <Route path="sponsor/Create" element={<CreateSponsorAdmin />} />

              <Route path="speakers/edit/:id" element={<EditSpeakersAdmin />} />

              <Route path="users/edit/:id" element={<EditUsersAdmin />} />
              <Route path="sessions" element={<AdminSessions />} />
              <Route
                path="events/update/:id/sessions/create"
                element={<CreateSessionPage />}
              />
              <Route
                path="events/update/:id/sessions/"
                element={<CreateSessionPage />}
              />
              <Route path="categories" element={<AdminCategories />} />
              <Route
                path="categories/create"
                element={<CreateCategoryPage />}
              />
              <Route path="targetAudience" element={<AdminTargetAudience />} />
              <Route
                path="targetAudience/create"
                element={<CreateTargetAudience />}
              />
              <Route
                path="targetAudience/edit/:id"
                element={<EditTargetAudience />}
              />
              <Route
                path="category/update/:id"
                element={<EditcategoryPage />}
              />
              <Route path="events/update/:id" element={<EditEvent />} />
            </Routes>
          </div>
        </div>
      ) : fromLogout ? (
        <Navigate to="/" />
      ) : (
        <Navigate to="/401" />
      )}
    </>
  )
}
