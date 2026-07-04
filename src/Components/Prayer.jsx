export default function Prayer({name, time , className}) {
  return (
    <div className={`prayer ${className || ""}`}>
      <p className="name_Prayer">{name}</p>
      <p className="time_Prayer">{time}</p>
    </div>
  )
}
