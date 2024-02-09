import React, { useEffect } from "react"
import "../assets/styles/aboutus.css"
import { useDispatch } from "react-redux"
import { setCurrentPage } from "../Features/NavigationSlice"

const DataAboutUs = [
  {
    photo: "../Images/1337.jpg",
    Description: "The Moroccan Microsoft Community stands as a beacon of knowledge and innovation in the IT realm, organizing insightful events such as Microsoft Tech Talks. Beyond mere discussions, they delve deep into practical skills with specialized bootcamps covering AI and Azure DevOps .NET, nurturing a new generation of tech-savvy professionals."
  }
  ,
  {
    photo: "../Images/EnsaImg.jpg",
    Description: "With a cadre of accomplished speakers boasting MVP and MCT credentials, the Moroccan Microsoft Community elevates learning to new heights. Their commitment transcends boundaries, as they traverse remote regions, sharing not only expertise but also genuine warmth and joy. Their passion for empowering youth and expanding the tech horizon knows no bounds."
  },
  {
    photo: "../Images/Ourzazate.jpg",
    Description: "At the heart of the Moroccan Microsoft Community beats a passion for education and outreach. Through a blend of captivating events and hands-on bootcamps, they equip participants with the tools to thrive in a digital landscape. With each visit to remote areas, they sow the seeds of knowledge, cultivating a future where technology is accessible to all and where enthusiasm for learning knows no bounds."
  }
]
function AboutUs() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCurrentPage("About"))
  }, [])
  return (
    <section className="about-us-container">
      <div className="titel">
        <h1>About Us</h1>
      </div>
      <div className="container">

        {
          DataAboutUs.map((e) => {
            return (
              <>
                <div className="card-cont">
                  <div className="image-container">
                    <img src={e.photo} alt="" />
                  </div>
                  <div className="text-contain">
                    <div className="text-header">
                      <h4>Moroccan Microsoft Community</h4>
                    </div>
                    <div className="text-body">
                      {e.Description}
                    </div>
                  </div>
                </div>
              </>
            )
          })
        }




      </div>
      <div className="text-miss">
        <div className="titel">
          <h1>Our Values</h1>
        </div>
        <p className="description">
          At the Moroccan Microsoft Community, we are committed to bridging the gap between technology and knowledge accessibility.
          Through events like Microsoft Tech Talks and specialized bootcamps, we empower individuals with the latest skills in AI and Azure DevOps .NET. With a team of esteemed
          MVPs and MCTs, we deliver top-tier mentorship. Our outreach extends to remote areas, spreading knowledge and fostering empowerment throughout Morocco.
        </p>
      </div>
    </section>
  )
}

export default AboutUs
