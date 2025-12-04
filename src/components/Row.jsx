import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Row.css'

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const loadMovies = async () => {
      const { data } = await fetchUrl()
      setMovies(data.results)
    }
    loadMovies()
  }, [fetchUrl])

  const handleClick = (movie) => {
    navigate(`/movie/${movie.id}`)
  }

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      <div className="row-posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row-poster ${isLargeRow && 'row-poster-large'}`}
            src={`https://image.tmdb.org/t/p/w500${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name || movie.title}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
    </div>
  )
}

export default Row
