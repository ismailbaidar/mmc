import Footer from "../components/Footer"
import Cards from "../components/Cards"
import EventTimer from "../components/EventImer"
import Stats from "../components/Stats"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFromLogout } from "../Features/AuthSlice"
import { setCurrentPage } from "../Features/NavigationSlice"
import { getAllEvents, getThisWeekEvents } from "../Features/EventSlice"
import { esES } from "@mui/material/locale"
export default function HomePage() {
  const dispatch = useDispatch()
  const events = useSelector((state) => state.EventReducer.events)
  const [event, setEvent] = useState({})
  const [date, setDate] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
  )
  useEffect(() => {
    dispatch(setFromLogout(false))
    dispatch(setCurrentPage("Home"))
    dispatch(getAllEvents())
  }, [])
  useEffect(() => {
    if (events != undefined) {
      setDate(events[0]?.dateStart.split("T")[0])
      setEvent(events[0])
    }
  }, [events])
  return (
    <div className="grid ">
      <Navbar></Navbar>
      <div className="grid gap-5">
        <EventTimer date={date} event={event}></EventTimer>
        <Cards />
        <Stats />
      </div>
      <Footer />
    </div>
  )
}
