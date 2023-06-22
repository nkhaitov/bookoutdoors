const csv = require('csv-parser');
const fs = require('fs');

const pool = require('./store/dbConnection');
const queries = require('./store/queries')

const results = [];

fs.createReadStream('tmdb_5000_movies.csv')
    .pipe(csv({}))
    .on('data', async (data) => {
        results.push(data);
        if (data.release_date) {
            await pool.query(queries.addMovieQuery, [data.id, data.title, data.overview, data.release_date, data.budget, data.popularity]);
        }
    })
    .on('end', () => {
        results.forEach(async (movie) => {
            const genres = JSON.parse(movie.genres);
            const productionCompanies = JSON.parse(movie.production_companies);

            genres.forEach(async (genre) => {

                try {
                    const genreExists = (await pool.query(queries.getGenreQuery, [genre.id])).rowCount;
    
                    if (!genreExists) {
                        await pool.query(queries.addGenreQuery, [genre.id, genre.name]);
                    }
                } catch (err) {
                    console.log(err);
                }

                await pool.query(queries.addMovieGenresQuery, [movie.id, genre.id]);
            });

            productionCompanies.forEach(async (productionCompany) => {

                try {
                    const productionCompanyExists = (await pool.query(queries.getProductionCompanyQuery, [productionCompany.id])).rowCount;
    
                    if (!productionCompanyExists) {
                        await pool.query(queries.addProductionCompanyQuery, [productionCompany.id, productionCompany.name]);
                    }
                } catch (err) {
                    console.log(err);
                }

                await pool.query(queries.addMovieProductionCompaniesQuery, [movie.id, productionCompany.id]);
            })
        });
    });