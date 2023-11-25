import './App.css'
import axios from 'axios'
import Dice from './dice';
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';

interface movieData {
	title: string;
	poster: string;
}

function App() {
	const [movie, setMovie] = useState<movieData | undefined>(undefined)
	const [imageLoaded, setImageLoaded] = useState(false);
	const [isMovieVisible, setIsMovieVisible] = useState(true);
	useEffect(() => {
		if (movie) {
			const image = new Image();
			image.src = movie.poster;
			image.onload = () => {
				setImageLoaded(true);
			};
		}
	}, [movie]);

	const drawMovie = () => {
		setIsMovieVisible(false)
		setMovie(undefined)
			axios
				.get('http://localhost:3030/roll-movie')
				.then((res) => {
					// setMovie(() => res.data);
					setTimeout(() => showResult(res.data), 1500);
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
			{imageLoaded && (
              <img src={movie.poster} alt={movie.title} style={{ width: '320px', height: '480px' }} />
            )}
        </div>
      )}
		<FontAwesomeIcon icon={faDice} className='drawnBtn' onClick={drawMovie} style={{ color: '#dcdde0', width: '30px' }} />
	</div>
    </>
  )
}

export default App
