import React from "react";
import "../assets/styles/speakers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faFacebook,
  faYoutube,
  faXTwitter
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faShareNodes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const speakersData = [
  {
    name: "Said WAHID",
    role: "Consultant Microsoft Cloud AZURE .Net & Office 365",
    image: "../Images/said_wahid.jpg",
    social: {
      facebook: "https://www.facebook.com/saidwahidmaroc",
      linkedin:  "https://www.linkedin.com/in/said-wahid-a0927715/?originalSubdomain=ma",
      instagram: "https://www.instagram.com/saidwahidmaroc/?hl=en",
    },
  },
  {
    name: "Hassan FADILI",
    role: "MVP Microsoft Cloud AZURE .Net & Office 365",
    image: "../Images/hassan_fadili.jpg",
    social: {
      facebook: "https://www.facebook.com/hassan.fadili.948",
      linkedin: "https://www.linkedin.com/in/hassan-fadili-3836422/?originalSubdomain=nl",
      instagram: "https://www.instagram.com/hassanfad11/?hl=en",
    },
  },
  {
    name: "Youssef CHIGANE",
    role: "DATA & AI Consultant",
    image: "../Images/youssef_chigane.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/youssef-chigane/",
    },
  },
  {
    name: "Mohssine MASAAF",
    role: "Consultant .NET Technical Lead",
    image: "../Images/mohssine_masaaf.jpg",
    social: {
      facebook: "https://www.facebook.com/MohssineRealReal",
      linkedin: "https://www.linkedin.com/in/mohssinemasaaf/",
      instagram: "https://www.instagram.com/mohssine_masaaf/",
    },
  },
  {
    name: "Outman BAZZAZ",
    role: "DATA & Business Intelligence Expert",
    image: "../Images/outman_bazzaz.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/outmanbaz/",
    },
  },
  {
    name: "Anas BELABBES",
    role: "MVP Microsoft",
    image: "../Images/anas_belabbes.jpg",
    social: {
      facebook: "https://www.facebook.com/anas.belabbes",
      linkedin: "https://www.linkedin.com/in/anasbelabbes/",
    },
  },
];

export default function Speakers() {
  return (
    <>
      <section>
        <div className="speakers-container">
          <div className="titel">
            <h3>Our Speakers</h3>
          </div>

          <div id="card-area">
            <div className="wrapper">
              <div className="box-area">
                {speakersData.map((speakerData, index) => (
                  <div key={index} className="box">
                    <div className="social-icons-container">
                      <FontAwesomeIcon
                        icon={faShareNodes}
                        className="social-media-icon"
                      />
                      <div className="icons-container">
                        {['facebook', 'linkedin', 'twitter', 'instagram', 'youtube'].map((socialMedia, i) => (
                          <a
                            key={i}
                            href={speakerData.social && speakerData.social[socialMedia]}
                            style={{ "--i": i + 1 }}
                          >
                            <FontAwesomeIcon
                              icon={getSocialIcon(socialMedia)}
                              style={{ color: speakerData.social && speakerData.social[socialMedia] ? 'inherit' : 'red' }}
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                    <img alt="" src={speakerData.image} />
                    <div className="overlay">
                      <h3>{speakerData.name}</h3>
                      <h5>{speakerData.role}</h5>
                      <div className="button"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function getSocialIcon(socialMedia) {
  switch (socialMedia) {
    case 'facebook':
      return faFacebook;
    case 'linkedin':
      return faLinkedin;
    case 'instagram':
      return faInstagram;
    case 'twitter':
      return faXTwitter;
    case 'youtube':
      return faYoutube;
    default:
      return null;
  }
}
