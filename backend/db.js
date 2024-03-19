const mongoose = require('mongoose');

async function connectDatabase() {
  try {
    await mongoose.connect('mongodb://localhost/harry-potter_pelis', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

module.exports = connectDatabase;
