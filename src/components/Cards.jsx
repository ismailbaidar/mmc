import Card from "./Card"
import "../assets/styles/cards.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllEvents } from "../Features/EventSlice"
export default function Cards() {
  const data = useSelector((state) => state.EventReducer.events)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllEvents())
  }, [])
  return (
    <div className="cards">
      <div className="section-name">
        <h1>Events</h1>
      </div>
      <div className="cards-wrapper">
        {data?.map((event, index) => {
          if (index < 3) {
            return <Card event={event} />
          }
        })}
      </div>
      <button className="show-more-button">Show more</button>
    </div>
  )
}
