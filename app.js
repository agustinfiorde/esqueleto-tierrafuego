import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import indexRouter from './src/routes/index.route.js';
import { error } from "./src/logger/logger.js";
import ApiError from './src/errors/api.error.js';
import { db } from "./src/db/index.db.js";


try {
  // db.sequelize.authenticate();
  // console.log('Connection has been established successfully.');
  // db.sequelize.sync();
  db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const API_ENDPOINT = process.env.API_ENDPOINT;
console.log(API_ENDPOINT);
if (API_ENDPOINT) {
  app.use(API_ENDPOINT, indexRouter);
}

app.use((req, res, next) => {
  error(JSON.stringify({ status: 404, message: `No existe el recurso solicitado ${req.originalUrl}` }));
  res.status(404).json({ status: 404, message: "No existe el recurso solicitado" });
});

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    error(JSON.stringify({ status: err.errorCode, message: err.message }));
    res.status(err.errorCode).json({ status: err.errorCode, error: err.message });
  } else {
    error(JSON.stringify({ status: 500, message: err.message }));
    res.status(500).json({ status: 500, error: err.message });
  }
});

export default app;
