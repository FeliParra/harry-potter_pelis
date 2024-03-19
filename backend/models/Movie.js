const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  imdbID: String,
  title: String,
  year: String,
  image: String,
  rating: { type: Number, min: 1, max: 5 }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
