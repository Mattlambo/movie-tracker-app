//imports react hooks and custom components

import { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import Login from "./login.jsx";

// This pulls your secret token from the .env file
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

//  creates variables linking to various APIs
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const DISCOVER_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?query=";


function App() {
  //Local State (UI behavior)
  //useState => tells React this component needs to "remember" some information.
  //[] an empty array // the hook returns an array with 2 elements =>movies (State Variable->holds current value), setMovies (The Setter Function-the way to update the value)
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  //login handler
  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem("moviehub.user", username);
  };

  //logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("moviehub.user");
  };

  //toggle favorite handler
  const handleToggleFavorite = (movie) => {
    if (!user) return;

    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);

    const updatedFavorites = isAlreadyFavorite
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem(
      `moviehub.favorites.${user}`,
      JSON.stringify(updatedFavorites)
    );
  };

  //another React Hook that handles side effects.
  useEffect(() => {
    const savedUser = localStorage.getItem("moviehub.user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  //array is empty if no user is logged in
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    const savedFavorites = localStorage.getItem(`moviehub.favorites.${user}`);
    setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
  }, [user]);


  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      setError("");

      const url = searchTerm
        ? `${SEARCH_URL}${encodeURIComponent(searchTerm)}`
        : DISCOVER_URL;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("failed to load movies:", error);
        setError("Failed to load movies. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      getMovies();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // creates a search interface with controlled input field.
  return (
    <div className="app-container">
      <header className="page-header">
        <h1 className="page-title">Movie Hub</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>


      <div className="user-bar">
        {!user && <Login onLogin={handleLogin} />}

        {user && (
          <div className="user-controls">
            <p className="welcome-text">Welcome, {user}</p>
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        )}
      </div>

      {user && (
        <section className="favorites-section">
          <h2>Your Favorites</h2>

          {favorites.length === 0 ? (
            <p className="empty-text">No favorites yet.</p>
          ) : (
            <div className="favorites-grid">
              {favorites.map((movie) => (
                //functional component called MovieCard destructuring props directly. It receives data.
                  <MovieCard
                  key={movie.id}
                  movie={movie}
                  title={movie.title}
                  rating={movie.vote_average}
                  posterUrl={movie.poster_path ? IMG_PATH + movie.poster_path : ""}
                  overview={movie.overview}
                  isFavorite={true}
                  onToggleFavorite={handleToggleFavorite}
                  isLoggedIn={true}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <section className="movie-section">
        <h2>{searchTerm ? "Search Results" : "Popular Movies"}</h2>

        {isLoading ? (
          <p className="loading-text">Loading Movies...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : movies.length === 0 ? (
          <p className="empty-text">
            {searchTerm ? `No movies found for "${searchTerm}".` : "No movies found."}
          </p>
        ) : (
          <main className="movie-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                title={movie.title}
                rating={movie.vote_average}
                posterUrl={movie.poster_path ? IMG_PATH + movie.poster_path : ""}
                overview={movie.overview}
                isFavorite={favorites.some((fav) => fav.id === movie.id)}
                onToggleFavorite={handleToggleFavorite}
                isLoggedIn={!!user}
              />
            ))}
          </main>
        )}
      </section>

      <footer className="page-footer">2026 MovieHub.com</footer>
    </div>
  );
}

export default App;