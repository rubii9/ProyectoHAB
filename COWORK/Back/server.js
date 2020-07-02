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
  deleteUser,
  getComunidades,
  getSomeUsers
} = require('./controllers/users');

//Spaces Controllers
const {
  listSpaces,
  newSpace,
  getSpace,
  deleteSpace,
  editSpace,
  voteSpaces,
  getSpaceVotes,
  validateReserve,
  reserveSpace
} = require('./controllers/spaces');

//My coworking
const {
  listMyCoworking,
  newIncident,
  payment,
  validatePay
} = require('./controllers/mycoworking');

//My spaces
const {
  listMySpaces,
  cleanSpace,
  closeIncident
} = require('./controllers/myspaces');

//Email
const { contact } = require('./controllers/email');

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
app.delete('/users', userIsAuthenticated, deleteUser);
app.get('/someusers', getSomeUsers);

//Spaces Routes
app.get('/spaces/validate', validateReserve);
app.get('/spaces/:id/votes', getSpaceVotes);
app.get('/spaces/:id', getSpace);
app.get('/spaces', listSpaces);
app.post('/spaces/:id/votes', userIsAuthenticated, voteSpaces);
app.post('/spaces/:id/reserve', userIsAuthenticated, reserveSpace);
app.post('/spaces', userIsAuthenticated, newSpace);
app.put('/spaces/:id', userIsAuthenticated, editSpace);
app.delete('/spaces/:id', userIsAuthenticated, userIsAdmin, deleteSpace);

//My Coworking
app.get('/mycoworking/validate', validatePay);
app.get('/mycoworking', userIsAuthenticated, listMyCoworking);
app.post('/mycoworking/:id/incident', userIsAuthenticated, newIncident);
app.post('/mycoworking/:id/pay', userIsAuthenticated, payment);

//My Spaces
app.get('/myspaces', userIsAuthenticated, listMySpaces);
app.put('/myspaces/:id/clean', userIsAuthenticated, cleanSpace);
app.put('/myspaces/:id/close', userIsAuthenticated, closeIncident);

//Contacto
app.post('/contact', contact);

//Comunidades
app.get('/comunidades', getComunidades);

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
