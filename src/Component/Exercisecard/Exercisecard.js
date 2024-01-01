import './Exercisecard.css'

const Exercisecard = (props) => {
  return (
    <div className='exercisecard-container'>
      <img src={props.gifUrl} alt="" />
      <div className="exercisecard-content">
        <h2>{props.name}</h2>
        <p>{props.target}</p>
        <p>{props.bodyPart}</p>
      </div>
      
    </div>
  )
}

export default Exercisecard
