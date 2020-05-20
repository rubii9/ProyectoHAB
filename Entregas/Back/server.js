require('dotenv').config();

const express = require('express');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT;

// User Controllers
const {
  newUser,
  getUser,
  editUser,
  loginUser,
  updatePasswordUser,
  validateUser,
  deleteUser
} = require('./controllers/users');

// EntrnewEntryy Controllers
const {
  listSpaces,
  newSpace,
  getSpace,
  deleteSpace,
  editSpace,
  voteSpaces,
  getSpaceVotes
} = require('./controllers/spaces');

// Auth middlewares
const { userIsAuthenticated, userIsAdmin } = require('./middlewares/auth');

// Console logger middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(bodyParser.json());

// Multipart parsing middleware
app.use(fileUpload());

// CORS middleware
app.use(cors());

// Serve static
app.use(express.static(path.join(__dirname, 'static')));

// User Routes
app.post('/users', newUser);
app.post('/users/login', loginUser);
app.get('/users/validate', validateUser);
app.post('/users/:id/password', userIsAuthenticated, updatePasswordUser);
app.get('/users/:id', userIsAuthenticated, getUser);
app.put('/users/:id', userIsAuthenticated, editUser);
app.delete('/users/:id', userIsAuthenticated, deleteUser);

//Spaces Routes
app.get('/spaces', listSpaces);
app.get('/spaces/:id', getSpace);
app.post('/spaces', userIsAuthenticated, newSpace);
app.put('/spaces/:id', userIsAuthenticated, editSpace);
app.get('/spaces/:id/votes', getSpaceVotes);
app.delete('/spaces/:id', userIsAuthenticated, userIsAdmin, deleteSpace);
app.post('/spaces/:id/votes', userIsAuthenticated, voteSpaces);

// Error middleware
app.use((error, req, res, next) => {
  // console.error(error);
  res.status(error.httpCode || 500).send({
    status: 'error',
    message: error.message
  });
});

// Not found middleware
app.use((req, res) => {
  res.status(404).send({ status: 'error', message: 'Not found' });
});

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port} 🚀`);
});
