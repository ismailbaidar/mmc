import "../assets/styles/card.css"
import { Link } from "react-router-dom"

// import { faYoutube } from  "@fortawesome/free-solid-svg-icons"
export default function Card({ event }) {
  function convertMonth(month) {
    switch (month) {
      case 1:
        return "JAN"

      case 2:
        return "FEB"

      case 3:
        return "MAR"
        break
      case 4:
        return "APR"
        break
      case 5:
        return "MAY"
        break
      case 6:
        return "JUN"
        break
      case 7:
        return "JUl"
        break
      case 8:
        return "AUG"
        break
      case 9:
        return "SEP"
        break
      case 10:
        return "OCT"
        break
      case 11:
        return "NOV"
        break
      case 12:
        return "DEC"
        break
    }
  }
  return (
    <>
      <div className="card">
        <div className="background-holder"></div>
        <div className="date-square">
          <span>{event.dateStart.split("T")[0].split("-")[2]}</span>
          <span>
            {convertMonth(
              parseInt(event.dateStart.split("T")[0].split("-")[1])
            )}
          </span>
        </div>
        <div className="card-info">
          <div className="card-event-info">
            <div className="event-title">{event.name}</div>
            <div
              className="event-description"
              dangerouslySetInnerHTML={{
                __html:
                  event.description.length > 150
                    ? event.description.substring(0, 150) + "..."
                    : event.descrpition,
              }}
            ></div>
          </div>
          <div className="speakers">
            <span className="speaker-circle-image">
              <img src="./public/Images/said_wahid.jpg" width={100} alt="" />
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
