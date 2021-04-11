import axios from 'axios'
import React from 'react'
import Movie from '../components/Movie'
import './Home.css'

/* Rendered a Home class
 * Class를 사용하는 이유는 state를 사용할 수 있기 때문
 */
class Home extends React.Component {
    state = {
        isLoading: true,
        movies: []
    }

    // 해당 함수가 끝날 때까지 대기(getMovies)
    getMovies = async() => {
        // await: 해당 동작이 끝날 때 까지 대기
        const {
            data: {
                data: {movies }
            }
        } = await axios.get(
            "https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating",
        )
        this.setState({ movies, isLoading: false })
    }
    // First rendering event
    componentDidMount() {
        this.getMovies()
    }
    // Rendering Home class
    render() { 
        const { isLoading, movies } = this.state;
        return ( 
            <section className="container">
                { isLoading ? (
                    <div className="loader">
                        <span className="loader__text">Loading...</span>
                    </div>
                ) : (
                    <div className="movies">
                        {movies.map(movie => (
                            <Movie 
                                key={movie.id}
                                id={movie.id} 
                                year={movie.year} 
                                title={movie.title} 
                                summary={movie.summary} 
                                poster={movie.medium_cover_image} 
                                genres={movie.genres}
                            />
                        ))}
                    </div>
                )}
            </section>
        )
    }
}

export default Home
