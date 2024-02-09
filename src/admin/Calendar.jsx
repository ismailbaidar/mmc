import * as React from "react"
import dayjs from "dayjs"
import Badge from "@mui/material/Badge"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { PickersDay } from "@mui/x-date-pickers/PickersDay"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton"
import "../assets/styles/red-dot.css"
import { useDispatch, useSelector } from "react-redux"
import { getThisMonthEventDates } from "../Features/EventSlice"
import { useEffect } from "react"

const date = new Date()

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays?.indexOf(props.day.date()) >= 0

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <div className="red-dot"></div> : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  )
}

export default function Calendar() {
  const [initialValue, setInitialValue] = React.useState(
    dayjs(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
  )

  const requestAbortController = React.useRef(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [days, setDays] = React.useState([])

  const monthEventsDates = useSelector(
    (state) => state.EventReducer.monthEventsDates
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getThisMonthEventDates(`${date["$y"]}-${date["$M"]}-1`)).then(
      () => {
        setDays(monthEventsDates)
        console.log(monthEventsDates, "hellooooooooooooo")
      }
    )
  }, [])

  function handleMonthChange(date) {
    console.log(`${date["$y"]}-${date["$M"] + 1}-1`)
    console.log(date)
    dispatch(getThisMonthEventDates(`${date["$y"]}-${date["$M"]}-1`)).then(
      () => {
        setDays(monthEventsDates)
        console.log(monthEventsDates, "hellooooooooooooo")
      }
    )
  }

  return (
    <div className="calendar">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={initialValue}
          loading={isLoading}
          onMonthChange={handleMonthChange}
          // renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays: days,
            },
          }}
        />
      </LocalizationProvider>
    </div>
  )
}
