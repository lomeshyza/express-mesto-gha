/* const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

//const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  /* useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log('App listening on port'/* `App listening on port ${PORT}` );
}); */

const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '647ef8eb23c44ae24c633697',
  };
  next();
});

app.use(router);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('App listening on port 3000');
});
