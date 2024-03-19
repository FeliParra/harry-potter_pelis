import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [ratings, setRatings] = useState({});
  const [filterTitle, setFilterTitle] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movies');
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      console.log(data);
      setMovies(data.movies);
      const initialRatings = {};
      data.movies.forEach(movie => {
        initialRatings[movie.imdbID] = movie.rating;
      });
      setRatings(initialRatings);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleRatingChange = async (movieId, rating) => {
    try {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
      });
      if (!response.ok) {
        throw new Error('Failed to update rating');
      }
      setRatings(prevRatings => ({
        ...prevRatings,
        [movieId]: rating
      }));
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const filteredMovies = movies.filter(movie => {
    if (filterTitle && !movie.title.toLowerCase().includes(filterTitle.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="container-fluid">
      <h1 className="text-center my-5">Lista de Películas de Harry Potter</h1>
      <input className="filter" type="text" value={filterTitle} onChange={e => setFilterTitle(e.target.value)} placeholder="Filtrar por título" />
      <div className="MovieContainer">
        {filteredMovies.map(movie => (
          <div className="col-md-3" key={movie.imdbID}>
            <div className="card mb-4 MovieCard">
              <img src={movie.image} className="card-img-top MovieImage" alt={movie.title} />
              <div className="card-body MovieInfo">
                <h5 className="card-title MovieTitle">{movie.title}</h5>
                <p className="card-text MovieYear">Año: {movie.year}</p>
                <p className="card-text">ID en IMDB: {movie.imdbID}</p>
                <form>
                  <div className="form-group MovieRating">
                    <label htmlFor={`rating-${movie.imdbID}`}>Valoración: </label>
                    <input
                      type="number"
                      className="form-control"
                      id={`rating-${movie.imdbID}`}
                      min="1"
                      max="5"
                      value={ratings[movie.imdbID]}
                      onChange={e => handleRatingChange(movie.imdbID, parseInt(e.target.value))}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
