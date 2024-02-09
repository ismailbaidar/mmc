import {
  faYoutube,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../assets/styles/footer.css"
export default function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="social">
              <h4>About Us</h4>
              <p>
                Morocco Microsoft Community is a Community that sharing
                knowledge to people and help them to have a good start
              </p>
            </div>
            <div className="social">
              <h4>Contact Us</h4>
              <ul>
                <li>Email: MMS@MMS.ma</li>
                <li>Phone: +212 6-*******</li>
                <li>Address: Morocco</li>
              </ul>
            </div>
            <div className="social">
              <h4>Social</h4>
              <ul className="social-icons">
                <li>
                  <a href="https://www.youtube.com/channel/UCQv1YtnzL3peYQRugSkUdpw">
                    <FontAwesomeIcon icon={faYoutube} className="youtube" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/moroccomicrosoftcommunity/">
                    <FontAwesomeIcon icon={faLinkedin} className="linkedin" />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/groups/2394490134114658">
                    <FontAwesomeIcon icon={faFacebook} className="facebook" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="copy">
            <p>©Morocco Microsoft Community</p>
          </div>
        </div>
      </footer>
    </>
  )
}
