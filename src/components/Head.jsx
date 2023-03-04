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
  const [genre, setGenre] = useState("all");
  return (
    <div className="head">
      <div className="search-container">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          placeholder="Movie name..."
          name="name"
          type={"search"}
        ></input>
        <button
        className="search-btn"
          onClick={() => {
            props.onsearch(search, genre);
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
            setGenre("all");
          }}
        >
          All
        </button>
        <button
          className={btnSelected[1] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, true, false, false, false, false]);
            setGenre("action");
          }}
        >
          Action
        </button>
        <button
          className={btnSelected[2] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, false, true, false, false, false]);
            setGenre("romance");
          }}
        >
          Romance
        </button>
        <button
          className={btnSelected[3] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, false, false, true, false, false]);
            setGenre("comedy");
          }}
        >
          Comedy
        </button>
        <button
          className={btnSelected[4] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, false, false, false, true, false]);
            setGenre("drama");
          }}
        >
          Drama
        </button>
        <button
          className={btnSelected[5] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, false, false, false, false, true]);
            setGenre("sci-Fi");
          }}
        >
          Sci-Fi
        </button>
      </div>
    </div>
  );
}
export default Head;
