import "../assets/styles/dashboard-event-card.css"
export default function ({ stat, name, icon }) {
  return (
    <div className="dashboard-event-card">
      <div className="icon">{icon}</div>
      <div className="info">
        <div className="stat">{stat}</div>
        <div className="name">{name}</div>
      </div>
    </div>
  )
}
