import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import indexRouter from './src/routes/index.route.js';
import { error } from "./src/logger/logger.js";
import ApiError from './src/errors/api.error.js';
import { db } from "./src/db/index.db.js";

import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

try {
  db.sequelize.authenticate().then(() => console.log('Connection has been established successfully.'));
  // db.sequelize.sync();
  // db.sequelize.sync({ force: true }).then(() => console.log("Drop and re-sync db."));
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

io.on('connection', (socket) => {
  console.log(`Usuario conectado`);

  socket.on('chat message', (msg) => {
    // console.log(`Mensaje recibido de ${msg.sender}: ${msg.text}`);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`Usuario desconectado`);
  });
});



const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
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
if (API_ENDPOINT) {
  app.use(API_ENDPOINT, indexRouter);
}

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Esqueleto',
      version: '1.0.0',
      description: 'Esqueleto de practica',
    },
    servers: [
      {
        url: `http://localhost:3000${API_ENDPOINT}`,
      },
    ],
  },
  tags: [
    {
      name: 'Login',
      description: 'Operaciones relacionadas con el login',
    },
    {
      name: 'Users',
      description: 'Operaciones relacionadas con los usuarios',
    },
    {
      name: 'Posts',
      description: 'Operaciones relacionadas con los posts',
    },
    {
      name: 'Comments',
      description: 'Operaciones relacionadas con los comentarios',
    },
  ],
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
