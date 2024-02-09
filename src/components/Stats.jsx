import { useState, useEffect, useMemo, useRef } from "react"
import CountUp from "react-countup"
import "../assets/styles/stats.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  faCalendarCheck,
  faCity,
  faHandshake,
  faUsers,
} from "@fortawesome/free-solid-svg-icons"

export default function Stats() {
  //mock data
  const data = {
    eventCountData: 3000000,
    attendanceCountData: 1200000,
    sponsorsCountData: 10000,
    visitedCitiesCountData: 111113,
  }

  return (
    <div className="stats">
      {true && (
        <>
          <div className="stat">
            <FontAwesomeIcon icon={faHandshake} />
            <CountUp
              start={0}
              duration={5}
              delay={2}
              end={data.eventCountData}
            />
          </div>
          <div className="stat">
            <FontAwesomeIcon icon={faUsers} />

            <CountUp
              start={0}
              duration={5}
              delay={2}
              end={data.attendanceCountData}
            />
          </div>
          <div className="stat">
            <FontAwesomeIcon icon={faCity} />
            <CountUp
              start={0}
              duration={5}
              delay={2}
              end={data.sponsorsCountData}
            />
          </div>
          <div className="stat">
            <FontAwesomeIcon icon={faCalendarCheck} />
            <CountUp
              start={0}
              duration={5}
              delay={2}
              end={data.visitedCitiesCountData}
            />
          </div>
        </>
      )}
    </div>
  )
}
