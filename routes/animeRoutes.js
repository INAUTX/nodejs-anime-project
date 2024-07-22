const { log } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// const animesFilePath = './data/animes.json';
const animesFilePath = path.join(__dirname, '../data/animes.json');

// leer el archivo JSON
const readAnimesFromFile = async () => {
  try {
    const data = await fs.readFile(animesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return[]
    throw err;
  }
};

// Escribir en el JSON
const writeAnimesToFile = async (animes) => {
  await fs.writeFile(animesFilePath, JSON.stringify(animes, null, 2));
};

// Ruta para crear un nuevo anime
router.post('/', async (req, res) => {
  const { title, genre, studioId } = req.body;
  const animes = await readAnimesFromFile();
  const newAnime = {
    id: animes.length + 1,
    title,
    genre,
    studioId
  };
  animes.push(newAnime);
  await writeAnimesToFile(animes);
  res.status(201).json({
    message: 'Anime creado exitosamente',
    anime: newAnime
  });
});

// Ruta para obtener todos los animes
router.get('/', async (req, res) => {
  const animes = await readAnimesFromFile();
  res.status(200).json({ animes });
});

// Ruta para obtener un anime por su ID
router.get('/:id', async (req, res) => {
  const animeId = parseInt(req.params.id, 10);
  const animes = await readAnimesFromFile();
  const anime = animes.find(a => a.id === animeId);
  if (anime) {
    res.status(200).json({ anime });
  } else {
    res.status(404).json({ message: 'Anime no encontrado' });
  }
});

// Ruta para actualizar un anime existente
router.put('/:id', async (req, res) => {
  const animeId = parseInt(req.params.id, 10);
  const { title, genre, studioId } = req.body;
  const animes = await readAnimesFromFile();
  const animeIndex = animes.findIndex(a => a.id === animeId);
  if (animeIndex !== -1) {
    animes[animeIndex] = { id: animeId, title, genre, studioId };
    await writeAnimesToFile(animes);
    console.log(animes);
    res.status(200).json({ message: 'Anime actualizado exitosamente' });
  } else {
    res.status(404).json({ message: 'Anime no encontrado' });
  }
});

// Ruta para eliminar un anime
router.delete('/:id', async (req, res) => {
  const animeId = parseInt(req.params.id, 10);
  let animes = await readAnimesFromFile();
  const animeIndex = animes.findIndex(a => a.id === animeId);
  if (animeIndex !== -1) {
    animes = animes.filter(a => a.id !== animeId);
    await writeAnimesToFile(animes);
    res.status(200).json({ message: 'Anime eliminado exitosamente' });
  } else {
    res.status(404).json({ message: 'Anime no encontrado' });
  }
});

module.exports = router;


// --------------------------Algunas conclusiones----------------------------------
// => La razón por la que la ruta está definida como router.get('/') y no directamente como /animes se debe a cómo Express maneja las rutas en los módulos. Al definir la ruta base /animes en server.js y luego usar router.get('/') en el archivo de rutas, estamos configurando la ruta completa como /api/animes.
