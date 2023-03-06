import { useEffect, useState } from "react";
import { Search , ChevronDown} from "react-feather";
import './Head.css'
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
  const [selectedSorter,setSelectedSorter] = useState('title')
  const [selectedOrder,setSelectedOrder] = useState('desc')
  const [hidden,setHidden] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState('all')
  useEffect(()=>{
    props.onSort(selectedSorter)
    props.onOrder(selectedOrder)
  },[selectedSorter,selectedOrder])
  return (
    <div className="head">
      {/*searsh*/}
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

          {/*sorters*/}
      <div className="sorters">
        <div className="sorters-lables">
          <p>Sort by:</p>
          <p>Order by:</p>
        </div>
        <span></span>
      </div>
      <div className="sorters">
        <div className="sorters-select">
        <select value={selectedSorter} onChange={(e)=>{
          setSelectedSorter(e.target.value)
        }}>
          <option value="title">Title</option>
          <option value="year">Year</option>
          <option value="rating">Rating</option>
          <option value="date_added">Date added</option>
        </select>
        <select value={selectedOrder} onChange={(e)=>{
          setSelectedOrder(e.target.value)
        }}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option> 
        </select>
        </div>
        <span></span>
      </div>
      

      {/*filters*/}
      <div className="colaps">
      <div onClick={()=>{setHidden(!hidden)}}>{selectedFilter}<ChevronDown/>   </div>
        <span >
        </span>
      </div>
      <div className={hidden? 'filters hidden' : 'filters'}>
        <button
          className={btnSelected[0] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([true, false, false, false, false, false]);
            props.onfilter("all");
            setSelectedFilter('all');
            setHidden(!hidden)
          }}
        >
          All
        </button>
        <button
          className={btnSelected[1] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, true, false, false, false, false]);
            props.onfilter("action");
            setSelectedFilter('action');
            setHidden(!hidden)
          }}
        >
          Action
        </button>
        <button
          className={btnSelected[2] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, false, true, false, false, false]);
            props.onfilter("romance");
            setSelectedFilter('romance');
            setHidden(!hidden)
          }}
        >
          Romance
        </button>
        <button
          className={btnSelected[3] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, false, false, true, false, false]);
            props.onfilter("comedy");
            setSelectedFilter('comedy');
            setHidden(!hidden)
          }}
        >
          Comedy
        </button>
        <button
          className={btnSelected[4] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, false, false, false, true, false]);
            props.onfilter("drama");
            setSelectedFilter('drama');
            setHidden(!hidden)
          }}
        >
          Drama
        </button>
        <button
          className={btnSelected[5] ? "selected" : ""}
          onClick={() => {
            setButtonSelected([false, false, false, false, false, true]);
            props.onfilter("adventure");
            setSelectedFilter('adventure');
            setHidden(!hidden)
          }}
        >
          Adventure
        </button>
      </div>
    </div>
  );
}
export default Head;
