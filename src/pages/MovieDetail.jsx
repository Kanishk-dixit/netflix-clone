import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchMovieDetails } from '../api/tmdb'
import './MovieDetail.css'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [trailer, setTrailer] = useState(null)

  useEffect(() => {
    const loadMovie = async () => {
      const { data } = await fetchMovieDetails(id)
      setMovie(data)
      const trailerVideo = data.videos?.results?.find(
        (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
      )
      setTrailer(trailerVideo)
    }
    loadMovie()
  }, [id])

  if (!movie) return <div className="loading">Loading...</div>

  return (
    <div className="movie-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div
        className="movie-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="movie-overlay" />
      </div>
      <div className="movie-content">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <div className="movie-meta">
            <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
            <span>{movie.release_date?.split('-')[0]}</span>
            <span>{movie.runtime} min</span>
          </div>
          <p className="movie-overview">{movie.overview}</p>
          <div className="movie-genres">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>
          {trailer && (
            <div className="trailer-section">
              <h3>Watch Trailer</h3>
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
