import { useState } from "react";
import { ChevronDown, Search } from "react-feather";

function Head(props) {
  const [btnSelected, setButtonSelected] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [search, setSearch] = useState("");
  return (
    <div className="head">
      <div className="search-container">
        <input
          onChange={(e) => {
            setSearch(e.target.value)
            props.onchange(e.target.value)
          }}
          value={search}
          placeholder="Movie name..."
          name="name"
          type={"search"}
        ></input>
        <button onClick={()=>{props.fillter()}}>
          <Search></Search>
        </button>
      </div>
      <div className="filters">
        <button
          className={btnSelected[0] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([true, false, false, false, false, false]);
            props.filterHandler('All')
          }}
        >
          All
        </button>
        <button
          className={btnSelected[1] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, true, false, false, false, false]);
            props.filterHandler('Action')
          }}
        >
          Action
        </button>
        <button
          className={btnSelected[2] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, false, true, false, false, false]);
            props.filterHandler('Romance')
          }}
        >
          Romance
        </button>
        <button
          className={btnSelected[3] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, false, false, true, false, false]);
            props.filterHandler('Comedy')
          }}
        >
          Comedy
        </button>
        <button
          className={btnSelected[4] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, false, false, false, true, false]);
            props.filterHandler('Drama')
          }}
        >
          Drama
        </button>
        <button
          className={btnSelected[5] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, false, false, false, false, true]);
            props.filterHandler('Sci-Fi')
          }}
        >
          Sci-Fi
        </button>
      </div>
    </div>
  );
}
export default Head;
