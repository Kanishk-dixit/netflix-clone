import Banner from '../components/Banner'
import Row from '../components/Row'
import * as api from '../api/tmdb'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <Banner />
      <Row title="Netflix Originals" fetchUrl={api.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" fetchUrl={api.fetchTrending} />
      <Row title="Top Rated" fetchUrl={api.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={api.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={api.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={api.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={api.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={api.fetchDocumentaries} />
    </div>
  )
}

export default Home
