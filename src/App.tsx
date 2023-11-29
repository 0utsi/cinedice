import './App.css'
import axios from 'axios'
import Dice from './DiceComp/Dice';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import movieData from './interfaces/movieData';
import Optionals from './OptionalsComp/Optionals';

function App() {
	const [movie, setMovie] = useState<movieData | undefined>(undefined)
	const [isMovieVisible, setIsMovieVisible] = useState(true)


	const drawMovie = () => {
		setIsMovieVisible(false);
		setMovie(undefined);
			axios
				.get('http://localhost:3030/roll-movie/in')
				.then((res) => {
					setTimeout(() => showResult(res.data), 1500);
					console.log(res.data, res.data.title)
				})
				.catch((err) => {
					console.error(err)
				})
	}

	const showResult = (data: movieData) => {
		setIsMovieVisible(true);
		setMovie(data);
	}


return (
    <>
	<div className="App">
		<h1>CineDice</h1>
		<Dice opacity={!isMovieVisible ? 1 : 0} />
		{movie && (
        <div className="movie">
			<h2>{movie.title}</h2>
				<img src={movie.poster} alt={movie.title} title={movie.overview}/>
				<span className="date">{movie.release_date}</span>
        </div>
      )}
		<FontAwesomeIcon icon={faDice} className='drawnBtn' onClick={drawMovie} style={{ color: '#dcdde0'}} />
			<Optionals/>
	</div>
    </>
  )
}

export default App
