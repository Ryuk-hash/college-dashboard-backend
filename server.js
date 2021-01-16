const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handling uncaught exceptions in the code! >> globally << Here it's mandatory to crash the application.
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log(err.stack);
  console.log('UNCAUGHT EXCEPTION! >> Server shutting down . . . . .');

  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connection Successful!');
  });

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});

// Handling unhandled rejections in the code! >> globally << Here it's not mandatory to crash the application.
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! >> Server shutting down . . . . .');

  server.close(() => {
    process.exit(1);
  });
});
