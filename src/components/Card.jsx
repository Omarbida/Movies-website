import { useState } from "react";
import "./Card.css";

function Card(props) {
    const [moseover,setMousover] = useState(false)
  return (
    <div onClick={()=>{props.onclick(props.id)}} onMouseEnter={()=>{setMousover(true)}} onMouseLeave={()=>{setMousover(false)}} className="card">
      <div className="bg-div">
        <img src={props.medium_cover_image}></img>
        <div className="absolute-container">
          <div className="rating">{props.rating}</div>
          <div className="year">{props.year}</div>
        </div>
        {moseover && <div className="over-lay">{props.summary}</div>}
      </div>
      <div className="title">{props.title}</div>
    </div>
  );
}

export default Card;
