const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, origin); // allow all origins, needed if using credentials
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/auth');
const { swaggerUi, specs } = require('../api-docs/swagger');

// Routes
app.use('/api/users', authRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



module.exports = app;
