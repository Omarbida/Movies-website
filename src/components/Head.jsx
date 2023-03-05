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
            setSearch(e.target.value);
            if(e.target.value == ''){
                props.onsearch('');
            }
          }}
          value={search}
          placeholder="Movie name..."
          name="name"
          type={"search"}
        ></input>
        <button
        className="search-btn"
          onClick={() => {
            props.onsearch(search);
          }}
        >
          <Search></Search>
        </button>
      </div>
      <div className="filters">
        <button
          className={btnSelected[0] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([true, false, false, false, false, false]);
            props.onfilter("all");
          }}
        >
          All
        </button>
        <button
          className={btnSelected[1] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, true, false, false, false, false]);
            props.onfilter("action");
          }}
        >
          Action
        </button>
        <button
          className={btnSelected[2] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, false, true, false, false, false]);
            props.onfilter("romance");
          }}
        >
          Romance
        </button>
        <button
          className={btnSelected[3] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, false, false, true, false, false]);
            props.onfilter("comedy");
          }}
        >
          Comedy
        </button>
        <button
          className={btnSelected[4] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, false, false, false, true, false]);
            props.onfilter("drama");
          }}
        >
          Drama
        </button>
        <button
          className={btnSelected[5] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, false, false, false, false, true]);
            props.onfilter("sci-Fi");
          }}
        >
          Sci-Fi
        </button>
      </div>
    </div>
  );
}
export default Head;
