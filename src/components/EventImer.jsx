import TimerPart from "./TimerPart"
import "../assets/styles/event-timer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
export default function EventTimer({ date, event }) {
  const [days, setDays] = useState("")
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [seconds, setSeconds] = useState("")
  const currentDate = new Date()
  const eventDate = new Date(date)
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentDate.getTime() > eventDate.getTime()) {
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
  return (
    <div className="event-timer-container">
      <div className="info-part">
        <h1 className="subtitle">Event</h1>
        <h1 className="title">{event?.name}</h1>
      </div>
      <span className="event-timer">
        <TimerPart title="Days" value={`${days}`}></TimerPart>
        <TimerPart title="Hours" value={`${hours}`}></TimerPart>
        <TimerPart title="Minutes" value={`${minutes}`}></TimerPart>
        <TimerPart title="Seconds" value={`${seconds}`}></TimerPart>
      </span>
      <div className="location-button">
        <button className="btn  font-bold">Show Details</button>
        <div className="location grid gap-2">
          <span className="date text-transparent font-bold ">{date}</span>
          <span className="flex justify-between gap-[1rem]">
            <FontAwesomeIcon icon={faLocationDot} />
            <span className="text-lg">{event?.adress}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
