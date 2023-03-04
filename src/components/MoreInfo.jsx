import "./MoreInfo.css";
import { ArrowLeftCircle, Heart, Youtube, Download , Frown} from "react-feather";

function MoreInfo(props) {
  return (
    <div className="movie-info-all">
        
      <div className="tr-info-container">
      <div
        style={{ backgroundImage: `url(${props.bg_img})` }}
        className="info-container"
      >
        <div className="info-header">
          <button
            className="info-back-btn"
            onClick={() => {
              props.onclose();
            }}
          >
            <ArrowLeftCircle size={28} color="white"></ArrowLeftCircle>
          </button>
          <div className="info-title">{props.title}</div>
          <div className="info-rating">
            <Heart size={20} />
            {props.rating}
          </div>
        </div>
        
        <div className="buffer"></div>
        <div className="info-discriptio">{props.discription}</div>
        <div className="genres">
          {props.genres.map((x, i) => {
            return <div key={i}>{x}/</div>;
          })}
        </div>
      </div>
      {props.yt_trailer_code && <div className="trailer">
        <iframe
        //   width="560"
        //   height="315"
          src={`https://www.youtube.com/embed/${props.yt_trailer_code}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        </div> || <div className="notfound">No trailer was found <Frown size={30}/></div>}
      </div>
      <div className="info-controls">
        <div className="info-downloads">
          {props.torrents.map((torrent, i) => {
            return (
              <a href={torrent.url} key={i} className="torrent">
                <Download size={30}></Download>
                <p>torrent</p>
                <p>{torrent.quality}</p>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MoreInfo;
