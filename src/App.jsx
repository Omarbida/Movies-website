import { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.css";
import Head from "./components/Head";
import MoreInfo from "./components/MoreInfo";
import { ChevronRight, ChevronLeft, FileMinus } from "react-feather";

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
  const [sortBy, setSortBy] = useState("title");
  const [orderBy, setOrderBy] = useState("desc");
  useEffect(() => {
    setLoading(true);
    fetch(
      "https://yts.mx/api/v2/list_movies.json?limit=15" +
        `&page=${currentPage}` +
        `&query_term=${searchValue}` +
        `&genre=${selectedFilter}` +
        `&sort_by=${sortBy}` +
        `&order_by=${orderBy}`
    )
      .then((res) => {
        res.json().then((data) => {
          setMovies(data?.data?.movies);

          if (data?.data?.movie_count % 15 == 0) {
            setPages( data?.data?.movie_count / 15);
          } else {
            setPages( Math.floor(data?.data?.movie_count / 15) + 1);
          }
          setTimeout(() => {
            setLoading(false);
          }, 50);
        });
      })
      .catch(() => {})
      .finally(() => {});
  }, [currentPage, searchValue, selectedFilter, sortBy, orderBy]);
  useEffect(() => {
    setmoviesList(movies);
  }, [movies]);
  const search = (searchvalue) => {
    setSearchValue(searchvalue);
  };
  const filterHandler = (genreValue) => {
    setSelectedFilter(genreValue);
    setCurrentPage(1)
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
  const sortHandler = (value) => {
    setSortBy(value);
    setCurrentPage(1)
  };
  const orderHandler = (value) => {
    setOrderBy(value);
    setCurrentPage(1)
  };
  return (
    <div className="App">
      {!showInfo && (
        <Head
          onSort={sortHandler}
          onOrder={orderHandler}
          onsearch={search}
          onfilter={filterHandler}
        ></Head>
      )}

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
        {!showInfo && !moviesList && !loading &&(
          <div className="nomovies">
            Something went Wrong <FileMinus size={50} />
          </div>
        ) || !showInfo && !loading && (
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
        ) }
        {/*pages*/}
        
        {/*pages*/}
      </div>
    </div>
  );
}

export default App;
