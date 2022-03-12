import "./App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FavoritesList from "./Components/FavoritesList";

function App() {
  const [games, setGames] = useState("");
  const [movies, setMovies] = useState("");
  const [tvShows, setTvShows] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/games")
      .then((res) => {
        return res.json();
      })
      .then((games) => {
        setGames(games);
      });

    fetch("http://localhost:4000/movies")
      .then((res) => {
        return res.json();
      })
      .then((movies) => {
        setMovies(movies);
      });

    fetch("http://localhost:4000/tv-shows")
      .then((res) => {
        return res.json();
      })
      .then((tvShows) => {
        setTvShows(tvShows);
      });
  }, []);

  return (
    <>
      <header id="app-header">
        <Link className="btn" to="/create">
          Create New Favorite
        </Link>
      </header>
      <main id="app-main">
        {games && <FavoritesList favorites={games} />}
        {movies && <FavoritesList favorites={movies} />}
        {tvShows && <FavoritesList favorites={tvShows} />}
      </main>
      <footer>
        <p>© All rights reserved | Arib Farooqui</p>
      </footer>
    </>
  );
}

export default App;
