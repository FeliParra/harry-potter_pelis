const express = require('express');
const connectDatabase = require('./db');
const { searchHarryPotterMovies } = require('./api');
const Movie = require('./models/Movie');

const app = express();
const PORT = process.env.PORT || 5000;

connectDatabase();

// Obtener y almacenar las peliculas de Harry Potter en la base de datos
app.get('/api/movies', async (req, res) => {
  try {
    const existingMovies = await Movie.find();
    if (existingMovies.length === 0) {
      const harryPotterMovies = await searchHarryPotterMovies();
      const moviesToSave = harryPotterMovies.map(movie => ({
        imdbID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        image: movie.Poster,
      }));
      await Movie.insertMany(moviesToSave);
      res.status(200).json({ movies: moviesToSave }); 
    } else {
      res.status(200).json({ movies: existingMovies });
    }
  } catch (error) {
    console.error('Error saving or fetching Harry Potter movies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
