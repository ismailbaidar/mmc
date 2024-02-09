import NotFoundSvg from "../components/NotFoundSvg"
import "../assets/styles/error-page.css"
import UnauthorizedSvg from "../components/UnauthorizedSvg"
import { Link } from "react-router-dom"

import { useState } from "react"
export default function ErrorPage({ code }) {
  const messages = {
    404: {
      firstTitle: "Page 404",
      secondTitle: ["Not", "found."],
      paragraphs: [
        "The page you requested cannot be found",
        "Try going back to the home page",
      ],
    },
    401: {
      firstTitle: "OOPS,",

      secondTitle: ["No", "authorization found"],
      paragraphs: ["This page is not pulblically availlable"],
    },
  }
  const [selectedError, setSelectedError] = useState(messages[code])
  console.log(selectedError)
  return (
    <div className="error-page">
      <div className="image-container">
        {code == "404" ? (
          <NotFoundSvg></NotFoundSvg>
        ) : (
          code == "401" && <UnauthorizedSvg />
        )}
      </div>

      <div className="description">
        <div className="big-title">
          <span className="first-title">{selectedError.firstTitle}</span>
          <span className="second-title">
            <span className="colored">{selectedError.secondTitle[0]}</span>{" "}
            <span>{selectedError.secondTitle[1]}</span>
          </span>
        </div>
        <span className="paragraphs">
          <p className="first-paragraph">{selectedError.paragraphs[0]}</p>
          <p className="second-paragraph">{selectedError.paragraphs[1]}</p>
        </span>
        <button>
          <Link to="/">Back to home</Link>
        </button>
      </div>
    </div>
  )
}
