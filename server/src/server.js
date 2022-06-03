// Dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const { notFound, errorHandler, checkTokenSetUser, isLoggedIn } = require('./middleware/Middleware');

// App configuration
const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());
app.use(checkTokenSetUser);

// Database
require('./db');

// Basic Routes
app.get('/', async (req,res) => {
  res.json({
    message:'Productivity API',
  });
});

// Routes
app.use('/api/v1/auth',require('./auth'));
app.use('/api/v1/user', isLoggedIn ,require('./api/user'));
app.use('/api/v1/board',require('./api/board'));
app.use('/api/v1/list',require('./api/list'));

// error handler
app.use(notFound);
app.use(errorHandler);

// App Port
const PORT =  process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log('Listening on Port:', PORT);
});