import { useState, useEffect } from 'react';
import styles from './Movie.module.css';
import { NavLink } from 'react-router-dom';

const Movie = (props) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("harry");
  const [query, setQuery] = useState("harry");
  const [favoriteInp, SetFavoriteInp] = useState("");
  const [data, setData] = useState(false);
  const [favData, setFavData] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=${search}&apikey=119f7834`)
      .then(res => res.json())
      .then(data => {
        if (data.Response === "False") {
          setMovies([]);
          setError("Film tapılmadı.");
        } else {
          const moviesData = data.Search.map(movie => ({
            title: movie.Title,
            poster: movie.Poster,
            year: movie.Year,
            imdbID: movie.imdbID,
            disabled: false,
          }));
          setMovies(moviesData);
          setError("");
        }
      })
      .catch(err => {
        console.error(err);
        setError("Xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.");
      });
  }, [search]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    setSearch(query);
  };

  const handleAddFavorite = (index) => {
    const newMovies = [...movies];
    newMovies[index].disabled = true;
    setMovies(newMovies);
    const favoriteMovie = {
      title: newMovies[index].title,
      imdbID: newMovies[index].imdbID,
    };
    props.setImbdLink((setfav) => [...setfav, favoriteMovie.imdbID]);
    props.setMovieName((setfav) => [...setfav, favoriteMovie.title]);
    setFavorites((prevFavorites) => [...prevFavorites, favoriteMovie]);
  };

  const handleRemoveFavorite = (title) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter(favorite => favorite.title !== title)
    );
    const updatedMovies = movies.map(movie => {
      if (movie.title === title) {
        return { ...movie, disabled: false };
      }
      return movie;
    });
    setMovies(updatedMovies);
    if (props.setImbdLink) {
      props.setImbdLink((prevLinks) =>
        prevLinks.filter(link => link.title !== title)
      );
    }
    if (props.setMovieName) {
      props.setMovieName((prevNames) =>
        prevNames.filter(name => name !== title)
      );
    }
  };

  const FavoritesInp = (e) => {
    SetFavoriteInp(e.target.value);
  };

  return (
    <div>
      <header>
        <h1>MOVIE</h1>
      </header>
      <main>
        <div className={styles.search}>
          <input type="text" onChange={handleInputChange} placeholder="Search" />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className={styles.movies}>
          <div className={styles.movie}>
            {error ? (
              <p style={{ color: "red", fontSize: "18px" }}>{error}</p>
            ) : (
              movies.map((movie, index) => (
                <div className={styles.area} key={index}>
                  <img
                    style={{ borderRadius: "15px" }}
                    src={movie.poster}
                    alt={movie.title}
                  />
                  <div className={styles.movieText}>
                    <p style={{ fontSize: "28px" }}>
                      <b>{movie.title}</b>
                    </p>
                    <p style={{ fontSize: "20px", marginTop: "5px" }}>
                      <b>Year:</b> {movie.year}
                    </p>
                    <button
                      style={{
                        backgroundColor: movie.disabled || data
                          ? "#D3D3D3"
                          : "#A301D9",
                        borderColor: movie.disabled || data
                          ? "#A9A9A9"
                          : "#A301D9",
                        borderRadius: "10px",
                        width: "10vw",
                        height: "35px",
                        fontSize: "15px",
                        color: "white",
                        marginTop: "25px",
                        cursor: movie.disabled || data
                          ? "not-allowed"
                          : "pointer",
                      }}
                      onClick={() => handleAddFavorite(index)}
                      disabled={movie.disabled || data}
                    >
                      Favorite
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className={styles.movieList}>
            <div className={styles.list} style={{ overflow: "auto" }}>
              {favorites.map((favorite, index) => (
                <div
                  style={{ marginBottom: "15px" }}
                  key={index}
                  className={styles.favorite}
                >
                  <p>{favorite.title}</p>
                  <button
                    style={{
                      backgroundColor: "#CB232B",
                      color: "white",
                      border: "1px",
                      borderRadius: "50%",
                      width: "25px",
                      height: "25px",
                      cursor: "pointer",
                      marginLeft: "10px",
                      marginTop: "5px",
                      display: data ? "none" : "block",
                    }}
                    disabled={data}
                    onClick={() => handleRemoveFavorite(favorite.title)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <input
              disabled={data}
              onChange={FavoritesInp}
              type="text"
              style={{
                width: "33vw",
                fontSize: "15px",
                padding: "3px 10px",
                borderRadius: "8px",
                color: "#3C3C3C",
                border: "2.1px solid lightgrey",
              }}
            />
            <button
              disabled={!favoriteInp.trim() || favorites.length === 0 || data}
              className={styles.favoriteButton}
              style={{
                backgroundColor:
                  !favoriteInp.trim() || favorites.length === 0 || data
                    ? "#D3D3D3"
                    : "#A301D9",
                borderColor:
                  !favoriteInp.trim() || favorites.length === 0 || data
                    ? "#A9A9A9"
                    : "#A301D9",
                borderRadius: "10px",
                width: "10vw",
                height: "35px",
                fontSize: "15px",
                color: "white",
                marginTop: "25px",
                cursor:
                  !favoriteInp.trim() || favorites.length === 0 || data
                    ? "not-allowed"
                    : "pointer",
              }}
              onClick={() => {
                setData(true);
                setFavData(false);
                props.setListName("");
              }}
            >
              Add Favorite List
            </button>
            <NavLink to="/favorite" style={{ textDecoration: "none" }}>
              <button
                onClick={() => {
                  props.setListName(favoriteInp);
                }}
                className={styles.favoriteButton}
                style={{
                  backgroundColor: favData ? "#D3D3D3" : "#A301D9",
                  borderColor: favData ? "#A9A9A9" : "#A301D9",
                  borderRadius: "10px",
                  width: "10vw",
                  height: "35px",
                  fontSize: "15px",
                  color: "white",
                  marginTop: "25px",
                  cursor: favData ? "not-allowed" : "pointer",
                }}
              >
                Favorite List
              </button>
            </NavLink>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Movie;
