import Calendar from "./Calendar"
import "../assets/styles/dashboard.css"
import DashboardEventCard from "../components/DashboardEventCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCalendar,
  faCalendarPlus,
  faCheck,
  faCheckDouble,
  faCheckToSlot,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons"
import DashboardEventEvent from "../components/DashboardEventTable"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAdminCurrentPage, setPaths } from "../Features/AdminNavigationSlice"
import { getAllEvents, getThisMonthEventDates } from "../Features/EventSlice"
export default function Dashboard() {
  const events = useSelector((state) => state.EventReducer.events)

  const date = new Date()
  useEffect(() => {
    dispatch(getAllEvents())
  }, [])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPaths(["Dashboard"]))
    dispatch(setAdminCurrentPage("dashboard"))
  }, [])
  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="cards">
          <DashboardEventCard
            stat={events?.length}
            name="Total Event"
            icon={<FontAwesomeIcon icon={faCalendar} />}
          />
          <DashboardEventCard
            stat={1000}
            name="Total Registration"
            icon={<FontAwesomeIcon icon={faUserPlus} />}
          />
          <DashboardEventCard
            stat={1000}
            name="New Events"
            icon={<FontAwesomeIcon icon={faCalendarPlus} />}
          />
          <DashboardEventCard
            stat={1000}
            name="Completed Events"
            icon={<FontAwesomeIcon icon={faCheck} />}
          />
        </div>
        <Calendar />
      </div>
      <DashboardEventEvent />
    </div>
  )
}
