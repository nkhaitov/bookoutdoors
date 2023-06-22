const pool = require('./dbConnection');
const queries = require('./queries');

class movieStore {
    getAllMovies = async () => {
        try {
            const result = await pool.query(queries.getAllMoviesQuery);

            return result.rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    getMovieById = async (id) => {
        try {
            const result = await pool.query(queries.getMovieByIdQuery, [id]);

            return result.rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    addMovie = async (movie) => {
        console.log(movie);
        try {
            const result = await pool.query(queries.addMovieQuery, [movie.id, movie.title, movie.overview, movie.release_date, movie.budget, 0]);

            return result.rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    updateMovie = async (id, fields) => {
        try {
            let movieToUpdate = (await pool.query(queries.getMovieByIdQuery, [id])).rows[0];
            const keys = Object.keys(fields);

            keys.forEach((key) => {
                if (fields[key]) {
                    movieToUpdate[key] = fields[key];
                }
            });

            if (movieToUpdate.genres) {
                movieToUpdate.genres.forEach(async (genreId) => {
                    await pool.query(queries.addMovieGenresQuery, [id, genreId]);
                });
            }

            const result = await pool.query(queries.updateMovieQuery, [movieToUpdate.title, movieToUpdate.overview, movieToUpdate.popularity, id]);

            return result.rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    } 

    deleteMovie = async (id) => {
        try {
            await pool.query(queries.deleteMovieGenresQuery, [id]);
            await pool.query(queries.deleteMovieProductionCompanies, [id]);
            const result = await pool.query(queries.deleteMovieQuery, [id]);

            return result.rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

module.exports = movieStore;