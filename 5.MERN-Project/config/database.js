const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.once('open', err => {
    if (err) throw err;

    console.log('Database ready');
  });

  db.on('error', reason => {
    console.log(reason);
  });
}
