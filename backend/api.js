const axios = require('axios');

const OMDB_API_KEY = '731e41f';
const OMDB_BASE_URL = 'http://www.omdbapi.com';

async function searchHarryPotterMovies() {
  try {
    const response = await axios.get(`${OMDB_BASE_URL}/?s=harry+potter&apikey=${OMDB_API_KEY}`);
    return response.data.Search;
  } catch (error) {
    console.error('Error searching Harry Potter movies:', error);
    throw error;
  }
}

module.exports = {
  searchHarryPotterMovies,
};
