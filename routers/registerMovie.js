import express from 'express';
const router = express.Router();
import {Movie, Banner} from '../schema/filmeSchema.js';

// Função para transformar todos os elementos String do body em uppercase
function toUpperDeep(obj) {
  if (typeof obj === 'string') {
    return obj.toUpperCase();
  }
  if (Array.isArray(obj)) {
    return obj.map(toUpperDeep);
  }
  if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, toUpperDeep(value)])
    );
  }
  return obj;
}

// Rota para escolher filme aleatório
router.get('/listarFilmeAleatorio', async (req, res) => {
  try {
    const movieList = await Movie.find(); // Busca todos os filmes

    if (movieList.length === 0) {
      return res.status(404).json({ error: 'Nenhum filme encontrado' });
    }

    const number = Math.floor(Math.random() * movieList.length); // Índice aleatório
    const filme = movieList[number]; // Seleciona o filme
    console.log(filme)

    res.status(200).json(filme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/adicionarFilmes', async (req, res) => {
    try {
        const filmes = toUpperDeep(req.body);
        if(!Array.isArray(filmes)){
            return res.status(400).json({ error: "Esperando um array de filmes"})
        }
        const novosFilmes = await Movie.insertMany(filmes);
        res.status(201).json(novosFilmes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Filtrar os filmes pelo nome
router.put('/adicionarBanner/:titulo', async (req, res) => {
    try {
        const uriBanner = req.body.banner;

        if (!uriBanner || typeof uriBanner !== 'string') {
            return res.status(400).json({
                error: `Erro de formato no body: Tipo de entrada deve ser string. Tipo atual: ${typeof uriBanner}`
            });
        }

        const titulo = req.params.titulo.toUpperCase();

        const filmeAtualizado = await Movie.findOneAndUpdate(
            { title: titulo },
            { banner: uriBanner },
            { new: true }
        );

        if (!filmeAtualizado) {
            return res.status(404).json({ error: "Filme não encontrado" });
        }

        res.status(200).json(filmeAtualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default router;