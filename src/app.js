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
const coproprieteRoutes = require('./routes/copropriete');
const trancheRoutes = require('./routes/tranche');
const immeubleRoutes = require('./routes/immeuble');
const lotRoutes = require('./routes/lot');
const espaceCommunRoutes = require('./routes/espaceCommun');
const personneRoutes = require('./routes/personne');
const contratRoutes = require('./routes/contrat');
const demandeLocationRoutes = require('./routes/demandeLocation');
const assembleeGeneraleRoutes = require('./routes/assembleeGeneraleRoutes')
const sondageRoutes = require('./routes/sondageRoutes');
const pvRoutes = require('./routes/pvRoutes');
const ordreJourRoutes = require('./routes/ordreJourRoutes');

const { swaggerUi, specs } = require('../api-docs/swagger');

// Routes
app.use('/api/users', authRoutes);
app.use('/api/coproprietes', coproprieteRoutes);
app.use('/api/tranches', trancheRoutes);
app.use('/api/immeubles', immeubleRoutes);
app.use('/api/lots', lotRoutes);
app.use('/api/espaces-communs', espaceCommunRoutes);
app.use('/api/personnes', personneRoutes);
app.use('/api/contrats', contratRoutes);
app.use('/api/demandes-location', demandeLocationRoutes);
app.use('/api/assemblee-generale', assembleeGeneraleRoutes);
app.use('/api/sondage', sondageRoutes);
app.use('/api/pv', pvRoutes);
app.use('/api/ordre-jour', ordreJourRoutes);



// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



module.exports = app;
