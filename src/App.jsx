import { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.css";
import Head from "./components/Head";
import MoreInfo from "./components/MoreInfo";
import { ChevronRight, ChevronLeft ,FileMinus} from "react-feather";

function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [movieToShowInfo, setMovieToShowInfo] = useState({});
  const [movies, setMovies] = useState();
  const [moviesList, setmoviesList] = useState(movies);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://yts.mx/api/v2/list_movies.json?limit=30" +
        `&page=${currentPage}` +
        `&query_term=${searchValue}` +
        `&genre=${selectedFilter}`
    )
      .then((res) => {
        res.json().then((data) => {
          setMovies(data?.data?.movies);
          const pagesAll = Math.floor(data?.data?.movie_count / 30) + 1;
          setPages(pagesAll);
          if (currentPage > pagesAll) setCurrentPage(pagesAll);
          setTimeout(() => {
            setLoading(false);
          }, 50);
        });
      })
      .catch(() => {})
      .finally(() => {});
  }, [currentPage, searchValue, selectedFilter]);
useEffect(()=>{
  setmoviesList(movies)
},[movies])
  const search = (searchvalue) => {
    setSearchValue(searchvalue);
  };
  const filterHandler = (genreValue) => {
    setSelectedFilter(genreValue);
  };
  const showInfoHandler = (id) => {
    setShowInfo(true);
    moviesList.forEach((movie) => {
      if (movie.id === id) {
        setMovieToShowInfo(movie);
      }
    });
  };
  const closeHandler = () => {
    setShowInfo(false);
  };

  return (
    <div className="App">
      {!showInfo && <Head onsearch={search} onfilter={filterHandler}></Head>}

      {/*pages*/}
      {!showInfo && (
        <div className="pages">
          <button
            onClick={() => {
              setCurrentPage(1);
            }}
            className="first-last-btn pag"
          >
            First
          </button>
          <button
            disabled={loading}
            className="btn-pre pag"
            onClick={() => {
              if (currentPage != 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
          >
            <ChevronLeft size={30} />
          </button>
          <div className="curr-page pag">{currentPage}</div>
          <button
            disabled={loading}
            className="btn-next pag"
            onClick={() => {
              if (currentPage != pages) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            <ChevronRight size={30} />
          </button>
          <button
            onClick={() => {
              setCurrentPage(pages);
            }}
            className="first-last-btn pag"
          >
            Last
          </button>
        </div>
      )}
      {/*pages*/}
      <div className="content">
        {showInfo && (
          <MoreInfo
            title={movieToShowInfo.title_long}
            bg_img={movieToShowInfo.background_image_original}
            year={movieToShowInfo.year}
            rating={movieToShowInfo.rating}
            discription={movieToShowInfo.description_full}
            genres={movieToShowInfo.genres}
            torrents={movieToShowInfo.torrents}
            onclose={closeHandler}
            yt_trailer_code={movieToShowInfo.yt_trailer_code}
          ></MoreInfo>
        )}

        {!showInfo && moviesList && (
          <div className="movies">
            {!loading &&
              moviesList.map((movie, i) => {
                return (
                  <Card
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    bgimg={movie.background_image_original}
                    year={movie.year}
                    medium_cover_image={movie.medium_cover_image}
                    small_cover_image={movie.small_cover_image}
                    rating={movie.rating}
                    summary={movie.summary}
                    onclick={showInfoHandler}
                  ></Card>
                );
              })}
          </div>
        )}
        {!showInfo && !moviesList && <div className="nomovies">Something went Wrong <FileMinus size={50} /></div>}
      </div>
    </div>
  );
}

export default App;
