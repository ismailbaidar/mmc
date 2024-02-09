import React from "react"
import { Link } from "react-router-dom"
export default function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="background-side">
        <div className="image">
          <img
            style={{ background: "white", objectFit: "contain" }}
            src={event.url}
            alt=""
          />
        </div>
      </div>
      <div className="content-side">
        <div className="event-title">{event.name}</div>
        <p
          className="event-description"
          dangerouslySetInnerHTML={{
            __html: event.description.substring(0, 15) + "...",
          }}
        ></p>
        <div className="location-date">
          <span>{event.adress}</span>
          <span>01-JAN-2024</span>
        </div>

        <Link to={"single-event/" + event.id} className="reserve-button">
          Details
        </Link>
      </div>
    </div>
  )
}
