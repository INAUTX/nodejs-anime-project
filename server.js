const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const animeRoutes = require('./routes/animeRoutes');
const studioRoutes = require('./routes/studioRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rutas
app.use('/api/animes', animeRoutes);
app.use('/api/estudios', studioRoutes);

// uso del Middleware
app.use(errorHandler);

// app.get('/', (req, res) => {
//   res.send('¡Bienvenido a la API de la industria del anime, para ser OTAKU ademas de no bañarte (hay excepciones) tendrás que diseñar una API de anime!');
// });

app.listen(PORT, () => {
  console.log(`Servidor cargado en el puerto ${PORT}`);
});
