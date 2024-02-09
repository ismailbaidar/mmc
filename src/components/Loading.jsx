import "../assets/styles/loading.css"
export default function Loading({ scale = 1 }) {
  return (
    <div style={{ scale }} className="loading">
      <div className="loading-elements">
        <div className="block red"></div>
        <div className="block blue"></div>
        <div className="block green"></div>
        <div className="block yellow"></div>
      </div>
    </div>
  )
}
