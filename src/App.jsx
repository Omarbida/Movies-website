import { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.css";
import Head from "./components/Head";
import MoreInfo from "./components/MoreInfo";

function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [movieToShowInfo, setMovieToShowInfo] = useState({});
  const [movies, setMovies] = useState();
  const [moviesList, setmoviesList] = useState(movies);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  useEffect(() => {
    fetch("https://yts.mx/api/v2/list_movies.json?limit=50")
      .then((res) => {
        res.json().then((data) => {
          setMovies(data?.data?.movies);
          setmoviesList(data?.data?.movies);
        });
      })
      .catch(() => {})
      .finally(() => {});
  }, []);
  const getFilterHandler = (value) => {
    setSelectedFilter(value);
  };
  const searchValueHandler = (value) => {
    setSearchValue(value);
  };
  const fillter = () => {
    const tempMovies = movies.filter((movie, i) => {
      return (
        (movie.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          searchValue == "") &&
        (movie.genres.includes(selectedFilter) || selectedFilter == "All")
      );
    });
    setmoviesList(tempMovies);
  };
  useEffect(() => {
    if (movies) {
      fillter();
    }
  }, [selectedFilter]);

  const showInfoHandler = (id) => {
    setShowInfo(true);
    movies.forEach((movie) => {
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
      <Head
        fillter={fillter}
        filterHandler={getFilterHandler}
        onchange={searchValueHandler}
      ></Head>
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

       { !showInfo && <div className="movies">
          {moviesList &&
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
        </div>}
      </div>
    </div>
  );
}

export default App;
