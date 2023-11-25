import './App.css'
import axios from 'axios'
import Dice from './DiceComp/Dice';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import movieData from './interfaces/movieData';

function App() {
	const [movie, setMovie] = useState<movieData | undefined>(undefined)
	const [isMovieVisible, setIsMovieVisible] = useState(true)
	const drawMovie = () => {
		setIsMovieVisible(false)
		setMovie(undefined)
			axios
				.get('http://localhost:3030/roll-movie')
				.then((res) => {
					setTimeout(() => showResult(res.data), 2200);
					console.log(res.data, res.data.title)
				})
				.catch((err) => {
					console.error(err)
				})
	}

	const showResult = (data: movieData) => {
		setIsMovieVisible(true)
		setMovie(data)
	}

  return (
    <>
	<div className="App">
		<h1>CineDice</h1>
		<Dice opacity={!isMovieVisible ? 1 : 0} />
		{movie && (
        <div className="movie">
			<h2>{movie.title}</h2>
              <img src={movie.poster} alt={movie.title} style={{ width: '320px', height: '480px' }} title={movie.overview}/>
        </div>
      )}
		<FontAwesomeIcon icon={faDice} className='drawnBtn' onClick={drawMovie} style={{ color: '#dcdde0', width: '30px' }} />
	</div>
    </>
  )
}

export default App
