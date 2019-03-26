import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken';
import cors from 'cors'

import models from './models';
import { refreshTokens } from './auth';
import { SECRET, SECRET2 } from './config'

if (!models) {
  console.log('Could not connect to database');
}

// Setting up PORT
const port = process.env.PORT || 3400;

const app = express();
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());
app.use(cors('*'));

// Setting up info about user in req
const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(addUser);

require('./routes/user.routes.js')(app, models);

models.sequelize.sync({}).then(() => {
  app.listen(port, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`Server successfully initialized on PORT ${port}`)
  });
});