// const express = require('express');
// const fs = require('fs/promises');
// const router = express.Router();
// const studiosFilePath = './data/studios.json';

// // Leer archivo JSON
// const readStudiosFromFile = async () => {
//   try {
//     const data = await fs.readFile(studiosFilePath, 'utf8');
//     return JSON.parse(data);
//   } catch (err) {
//     return [];
//   }
// };

// // escribir archivo JSON
// const writeStudiosToFile = async (studios) => {
//   await fs.writeFile(studiosFilePath, JSON.stringify(studios, null, 2));
// };

// // Ruta para crear un nuevo estudio
// router.post('/studios', async (req, res) => {
//   const { name } = req.body;
//   const studios = await readStudiosFromFile();
//   const newStudio = {
//     id: studios.length + 1,
//     name
//   };
//   studios.push(newStudio);
//   await writeStudiosToFile(studios);
//   res.status(201).json({
//     message: 'Estudio creado exitosamente',
//     studio: newStudio
//   });
// });

// // Ruta para obtener todos los estudios
// router.get('/studios', async (req, res) => {
//   const studios = await readStudiosFromFile();
//   res.status(200).json({ studios });
// });

// // Ruta para obtener un estudio por su ID
// router.get('/studios/:id', async (req, res) => {
//   const studioId = parseInt(req.params.id, 10);
//   const studios = await readStudiosFromFile();
//   const studio = studios.find(s => s.id === studioId);
//   if (studio) {
//     res.status(200).json({ studio });
//   } else {
//     res.status(404).json({ message: 'Estudio no encontrado' });
//   }
// });

// // Ruta para actualizar un estudio existente
// router.put('/studios/:id', async (req, res) => {
//   const studioId = parseInt(req.params.id, 10);
//   const { name } = req.body;
//   const studios = await readStudiosFromFile();
//   const studioIndex = studios.findIndex(s => s.id === studioId);
//   if (studioIndex !== -1) {
//     studios[studioIndex] = { id: studioId, name };
//     await writeStudiosToFile(studios);
//     res.status(200).json({ message: 'Estudio actualizado exitosamente' });
//   } else {
//     res.status(404).json({ message: 'Estudio no encontrado' });
//   }
// });

// // Ruta para eliminar un estudio
// router.delete('/studios/:id', async (req, res) => {
//   const studioId = parseInt(req.params.id, 10);
//   let studios = await readStudiosFromFile();
//   const studioIndex = studios.findIndex(s => s.id === studioId);
//   if (studioIndex !== -1) {
//     studios = studios.filter(s => s.id !== studioId);
//     await writeStudiosToFile(studios);
//     res.status(200).json({ message: 'Estudio eliminado exitosamente' });
//   } else {
//     res.status(404).json({ message: 'Estudio no encontrado' });
//   }
// });

// module.exports = router;


const express = require('express');
const fs = require('fs/promises');
const router = express.Router();
const studiosFilePath = './data/studios.json';

// Leer archivo JSON
const readStudiosFromFile = async () => {
  try {
    const data = await fs.readFile(studiosFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// escribir archivo JSON
const writeStudiosToFile = async (studios) => {
  await fs.writeFile(studiosFilePath, JSON.stringify(studios, null, 2));
};

// Ruta para crear un nuevo estudio
router.post('/', async (req, res) => {
  const { name } = req.body;
  const studios = await readStudiosFromFile();
  const newStudio = {
    id: studios.length + 1,
    name
  };
  studios.push(newStudio);
  await writeStudiosToFile(studios);
  res.status(201).json({
    message: 'Estudio creado exitosamente',
    studio: newStudio
  });
});

// Ruta para obtener todos los estudios
router.get('/', async (req, res) => {
  const studios = await readStudiosFromFile();
  res.status(200).json({ studios });
});

// Ruta para obtener un estudio por su ID
router.get('/:id', async (req, res) => {
  const studioId = parseInt(req.params.id, 10);
  const studios = await readStudiosFromFile();
  const studio = studios.find(s => s.id === studioId);
  if (studio) {
    res.status(200).json({ studio });
  } else {
    res.status(404).json({ message: 'Estudio no encontrado' });
  }
});

// Ruta para actualizar un estudio existente
router.put('/:id', async (req, res) => {
  const studioId = parseInt(req.params.id, 10);
  const { name } = req.body;
  const studios = await readStudiosFromFile();
  const studioIndex = studios.findIndex(s => s.id === studioId);
  if (studioIndex !== -1) {
    studios[studioIndex] = { id: studioId, name };
    await writeStudiosToFile(studios);
    res.status(200).json({ message: 'Estudio actualizado exitosamente' });
  } else {
    res.status(404).json({ message: 'Estudio no encontrado' });
  }
});

// Ruta para eliminar un estudio
router.delete('/:id', async (req, res) => {
  const studioId = parseInt(req.params.id, 10);
  let studios = await readStudiosFromFile();
  const studioIndex = studios.findIndex(s => s.id === studioId);
  if (studioIndex !== -1) {
    studios = studios.filter(s => s.id !== studioId);
    await writeStudiosToFile(studios);
    res.status(200).json({ message: 'Estudio eliminado exitosamente' });
  } else {
    res.status(404).json({ message: 'Estudio no encontrado' });
  }
});

module.exports = router;
