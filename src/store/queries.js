const addMovieQuery = "INSERT INTO movie_profiles(id, title, overview, release_date, budget, popularity) VALUES ($1, $2, $3, $4, $5, $6)";

const addMovieGenresQuery = "INSERT INTO movie_genres(movie_id, genre_id) VALUES ($1, $2)";

const addMovieProductionCompaniesQuery = "INSERT INTO movie_production_companies(movie_id, production_company_id) VALUES ($1, $2)";

const addGenreQuery = "INSERT INTO genres(id, name) VALUES ($1, $2)";

const addProductionCompanyQuery = "INSERT INTO production_companies(id, name) VALUES ($1, $2)";

const getGenreQuery = "SELECT * FROM genres WHERE id=$1";

const getProductionCompanyQuery = "SELECT * FROM production_companies WHERE id=$1";

const getAllMoviesQuery = "SELECT * FROM movie_profiles";

const getMovieByIdQuery = "SELECT * FROM movie_profiles WHERE id=$1";

const updateMovieQuery = "UPDATE movie_profiles SET title=$1, overview=$2, popularity=$3 WHERE id=$4 RETURNING id, title, overview, release_date, budget, popularity";

const deleteMovieQuery = "DELETE FROM movie_profiles WHERE id=$1 RETURNING id, title, overview, release_date, budget, popularity";

const deleteMovieGenresQuery = "DELETE FROM movie_genres WHERE movie_id=$1 RETURNING movie_id, genre_id";

const deleteMovieProductionCompanies = "DELETE FROM movie_production_companies WHERE movie_id=$1 RETURNING movie_id, production_company_id";

module.exports = {
    addMovieQuery,
    addMovieGenresQuery,
    addMovieProductionCompaniesQuery,
    addGenreQuery,
    addProductionCompanyQuery,
    getGenreQuery,
    getProductionCompanyQuery,
    getAllMoviesQuery,
    getMovieByIdQuery,
    updateMovieQuery,
    deleteMovieQuery,
    deleteMovieGenresQuery,
    deleteMovieProductionCompanies,
}