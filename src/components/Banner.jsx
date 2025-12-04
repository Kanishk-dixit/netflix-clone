import { useState, useEffect } from 'react'
import { fetchTrending } from '../api/tmdb'
import './Banner.css'

function Banner() {
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const loadMovie = async () => {
      const { data } = await fetchTrending()
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)]
      setMovie(randomMovie)
    }
    loadMovie()
  }, [])

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

  if (!movie) return null

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>
        <p className="banner-description">
          {truncate(movie.overview, 150)}
        </p>
      </div>
      <div className="banner-fade" />
    </header>
  )
}

export default Banner
