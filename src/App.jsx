import { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import Login from "./login.jsx";


const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const DISCOVER_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?query=";


//state

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  //handlers

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem("moviehub.user", username);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("moviehub.user");
  };

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
          if (response.status === 401) throw new Error("Invalid API key");
          if (response.status === 429) throw new Error("Too many requests. Try again later");
          if (response.status === 500) throw new Error("Server error. Please try again later");
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
            <p className="empty-text">Add to favorites.</p>
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
          <p className="spinner"> </p>
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
                posterUrl={movie.poster_path ? `${IMG_PATH}${movie.poster_path}` : null}
                overview={movie.overview}
                isFavorite={favorites.some((fav) => fav.id === movie.id)}
                onToggleFavorite={handleToggleFavorite}
                isLoggedIn={!!user}
              />
            ))}
          </main>
        )}
      </section>

      <footer className="page-footer">
        <h3>Moviehub.com</h3>
        <h5 className="movieAPI">Powered by TMDB API</h5>
      </footer>

    </div>
  );
}

export default App;