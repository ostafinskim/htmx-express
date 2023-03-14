const mongoose = require('mongoose');

const connectDB = (uri) => {
  mongoose.connection.on('connected', () => {
    console.log(`Connected to database...`);
  });
  return mongoose.connect(`${uri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
