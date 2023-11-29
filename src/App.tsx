import './App.css'
import axios from 'axios'
import Dice from './DiceComp/Dice';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import {MovieData} from './interfaces/movieData';
import Optionals from './OptionalsComp/Optionals';

function App() {
	const [movie, setMovie] = useState<MovieData | undefined>(undefined)
	const [isMovieVisible, setIsMovieVisible] = useState(true)


	const drawMovie = () => {
		setIsMovieVisible(false);
		setMovie(undefined);
		const drawRequest = {
			genres: [],
			releaseYearRange: { "start": 2010, "end": 2022 },
		};

		axios
			.post('http://localhost:3030/movies', drawRequest)
			.then((res) => {
				setTimeout(() => showResult(res.data), 1500);
				console.log(res.data, res.data.original_title);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	const showResult = (data: MovieData) => {
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
			<h2>{movie.original_title}</h2>
				<img src={`https://image.tmdb.org/t/p/original/`+movie.poster_path} alt={movie.original_title} title={movie.overview}/>
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
