const express = require('express');
const router = express.Router();

const movieStore = require('../store/movieStore');
const store = new movieStore();

router.get('/', async (req, res) => {
    try {
        const movies = await store.getAllMovies();

        res.status(200).send(movies);
    } catch (err) {
        console.log(err);

        res.status(500).send('Encountered an error when attempting to fetch all movies');
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await store.getMovieById(id);

        res.status(200).send(movie);
    } catch (err) {
        console.log(err);

        res.status(500).send(`Encountered an error when attempting to fetch movie with id: ${id}`);
    }
})

router.post('/', async (req, res) => {
    const newMovie = req.body;
    console.log(newMovie);

    if (!newMovie.id || !newMovie.title || !newMovie.overview || !newMovie.release_date || !newMovie.budget) {
        res.status(400).send('Missing required field');
    }

    try {
        await store.addMovie(newMovie);

        res.status(200).send(newMovie);
    } catch (err) {
        console.log(err);

        res.status(500).send(`Encountered an error when attempting to create movie with id: ${id}`);
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const fields = req.body;

    try {
        const updatedMovie = await store.updateMovie(id, fields);

        res.status(200).send(updatedMovie);
    } catch (err) {
        console.log(err);

        res.status(500).send(`Encountered an error when attempting to update movie with id: ${id}`);
    }

    
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMovie = await store.deleteMovie(id);

        res.status(200).send(deletedMovie);
    } catch (err) {
        console.log(err);

        res.status(500).send(`Encountered an error when attempting to delete movie with id: ${id}`);
    }
})


module.exports = router;