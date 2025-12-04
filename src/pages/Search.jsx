import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { fetchSearch } from '../api/tmdb'
import './Search.css'

function Search() {
  const [searchParams] = useSearchParams()
  const [results, setResults] = useState([])
  const navigate = useNavigate()
  const query = searchParams.get('q')

  useEffect(() => {
    if (query) {
      const search = async () => {
        const { data } = await fetchSearch(query)
        setResults(data.results)
      }
      search()
    }
  }, [query])

  return (
    <div className="search-page">
      <h1>Search Results for "{query}"</h1>
      <div className="search-results">
        {results.length > 0 ? (
          results.map((item) => (
            item.poster_path && (
              <div
                key={item.id}
                className="search-item"
                onClick={() => navigate(`/movie/${item.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                />
                <p>{item.title || item.name}</p>
              </div>
            )
          ))
        ) : (
          <p className="no-results">No results found</p>
        )}
      </div>
    </div>
  )
}

export default Search
