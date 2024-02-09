import React from "react"
import "../assets/styles/single-Eventp.css"
import {
  faBullhorn,
  faCalendarCheck,
  faLocationDot,
  faHourglassHalf,
  faClock,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllEvents, getEventById } from "../Features/EventSlice"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { addParticipant, getIdByEmail } from "../Features/AuthSlice"
import MessageCard from "./MessageCard"
import Loading from "./Loading"

function SingleEventP() {
  const eventData = useSelector((state) => state.EventReducer.events)
  const isLoading = useSelector((state) => state.AuthReducer.isLoading)
  const success = useSelector((state) => state.AuthReducer.success)
  const error = useSelector((state) => state.AuthReducer.error)
  const [event, setEvent] = useState({})
  const dispatch = useDispatch()
  const { id } = useParams()
  useEffect(() => {
    dispatch(getAllEvents())
    // dispatch(getIdByEmail(localStorage.getItem("email")))
    console.log("hello from single page")
  }, [])

  useEffect(() => {
    setEvent(eventData?.find((e) => e.id == id))
  }, [eventData])

  const [days, setDays] = useState("")
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [seconds, setSeconds] = useState("")
  const currentDate = new Date()
  const date = event?.dateStart?.split("T")[0]
  const eventDate = new Date(date)
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentDate.getTime() > eventDate?.getTime()) {
        setDays(0)
        setMinutes(0)
        setHours(0)
        setSeconds(0)
      } else {
        setDaysFunction()
        setHoursFunction()
        setMinutesFunction()
        setSecondsFunction()
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [date])

  function setDaysFunction() {
    const diffDate = Math.floor(
      Date.UTC(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate()
      ) -
        Date.UTC(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        )
    )

    setDays(diffDate / (1000 * 60 * 60 * 24) - 1)
  }
  function setHoursFunction() {
    const currentHours = new Date().getHours()
    setHours(23 - currentHours)
  }

  function setMinutesFunction() {
    const currentMinutes = new Date().getMinutes()
    setMinutes(59 - currentMinutes)
  }
  function setSecondsFunction() {
    const currentSeconds = new Date().getSeconds()
    setSeconds(59 - currentSeconds)
  }

  const email = useSelector((state) => state.AuthReducer.email)
  const UserId = useSelector((state) => state.AuthReducer.id)

  function handleReservation(sessionId) {
    console.log(UserId)
    dispatch(
      addParticipant({
        idUser: localStorage.getItem("id"),
        idSession: sessionId,
      })
    )
  }

  return (
    <>
      {isLoading && (
        <div className="loading-wrapper">
          <Loading />
        </div>
      )}
      <div className="flash-cards-wrapper">
        {success && (
          <MessageCard
            type="success"
            title="Reservation done"
            content="Your place has been reserved"
          />
        )}
        {error && (
          <MessageCard
            type="error"
            title="Something went wrong"
            content="the operation "
          />
        )}
      </div>
      <div className="container-single">
        <div className="event-image-container">
          <div className="event-content">
            <h2>{event?.title}</h2>
          </div>
          <div className="img-Contain-sides">
            <img
              src={`${event?.url}`}
              alt={event?.title}
              className="event-image"
            />
          </div>
        </div>

        <div className="session-container">
          <Typography className="session-titel" variant="h5">
            Sessions
          </Typography>
          <table border="1" className="session-table">
            <thead>
              <tr>
                <td>Session Name</td>
                <td>Description</td>
                <td>Address</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {event?.sessions?.length > 0 ? (
                <>
                  {event?.sessions?.map((session) => {
                    return (
                      <tr>
                        <td>{session.name}</td>
                        <td>{session.description}</td>
                        <td>{session.adress}</td>
                        <td>{session.dateStart}</td>
                        <td>{session.dateEnd}</td>
                        <td>
                          <button
                            className="btn-register"
                            onClick={() => handleReservation(session.id)}
                          >
                            Reserve your page
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </>
              ) : (
                <tr>
                  <td colSpan={5}>no sessions yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="description-reservation">
          <div>
            <div className="time-event">
              <div className="space">Event Description</div>
            </div>

            <div className="detail-container-body">
              <div className="local-container">
                <p dangerouslySetInnerHTML={{ __html: event?.description }}></p>
              </div>
            </div>
          </div>
          <div className="d-grid container">
            <div className="time-event">
              <div className="space">Event Info</div>
            </div>
            <div className="reservation">
              <div className="single-page-timer">
                <div className="days">
                  {days}
                  <span>Days</span>
                </div>
                <div className="hours">
                  {hours}
                  <span>Hours</span>
                </div>
                <div className="minutes">
                  {minutes}
                  <span>Minutes</span>
                </div>
                <div className="seconds">
                  {seconds}
                  <span>Seconds</span>
                </div>
              </div>
              <div className="info">
                <span>
                  <span className="mini-title flex gap-2 align-items-center">
                    <FontAwesomeIcon icon={faClock} />
                    When
                  </span>
                  <div className="from-to">
                    <div>{event?.dateStart}</div>
                    <span>TO</span>
                    <div>{event?.dateEnd}</div>
                  </div>
                </span>
                <span>
                  <span className=" mini-title flex gap-2 align-items-center">
                    <FontAwesomeIcon icon={faLocationDot} />
                    Where
                  </span>
                  <span className="from-to">{event?.adress}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleEventP
