import axios from 'axios'

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8' // Free TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3'

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
})

export const fetchTrending = () => tmdb.get('/trending/all/week')
export const fetchNetflixOriginals = () => tmdb.get('/discover/tv', {
  params: { with_networks: 213 }
})
export const fetchTopRated = () => tmdb.get('/movie/top_rated')
export const fetchActionMovies = () => tmdb.get('/discover/movie', {
  params: { with_genres: 28 }
})
export const fetchComedyMovies = () => tmdb.get('/discover/movie', {
  params: { with_genres: 35 }
})
export const fetchHorrorMovies = () => tmdb.get('/discover/movie', {
  params: { with_genres: 27 }
})
export const fetchRomanceMovies = () => tmdb.get('/discover/movie', {
  params: { with_genres: 10749 }
})
export const fetchDocumentaries = () => tmdb.get('/discover/movie', {
  params: { with_genres: 99 }
})
export const fetchMovieDetails = (id) => tmdb.get(`/movie/${id}`, {
  params: { append_to_response: 'videos,credits' }
})
export const fetchSearch = (query) => tmdb.get('/search/multi', {
  params: { query }
})

export default tmdb
