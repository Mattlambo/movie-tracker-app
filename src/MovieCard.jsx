import { useState } from 'react';

function MovieCard({
  movie,
  title,
  rating,
  posterUrl,
  overview,
  isFavorite,
  onToggleFavorite,
  isLoggedIn
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(movie);
  };

  return (
    <div className={`movie-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-inner">
        <div className="card-front">
          <img src={posterUrl} alt={title} className="poster" />

          <div className="movie-info">
            <h3 className="movieTitle">{title}</h3>
            <span className="rating">{rating.toFixed(1)}</span>
          </div>

          {isLoggedIn && (
            <button className="favorite-btn" onClick={handleFavoriteClick}>
              {isFavorite ? <span className="check">Remove</span> : "Add"}
            </button>

          )}
        </div>

        <div className="card-back">
          <h3 className="backTitle">{title}</h3>
          <p>{overview || "No overview available."}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;