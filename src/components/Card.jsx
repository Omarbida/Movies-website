import { useState } from "react";
import "./Card.css";

function Card(props) {
  const [mouseover, setMousover] = useState(false);
  return (
    <div
      onClick={() => {
        props.onclick(props.id);
      }}
      onMouseEnter={() => {
        setMousover(true);
      }}
      onMouseLeave={() => {
        setMousover(false);
      }}
      className="card"
    >
      <div className="bg-div">
        <img src={props.medium_cover_image?  props.medium_cover_image : 'default_cover.jpg'} loading='lazy'
        
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src="default_cover.jpg";
        }}
        ></img>
        <div className="absolute-container">
          <div className="rating">{props.rating}</div>
          <div className="year">{props.year}</div>
        </div>
        {mouseover && <div className="over-lay">{props.summary}</div>}
      </div>
      <div className="title">{props.title}</div>
    </div>
  );
}

export default Card;
