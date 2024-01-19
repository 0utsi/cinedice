import './Movie.css'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faDice } from '@fortawesome/free-solid-svg-icons';
import Optionals from './OptionalsComp/Optionals';
import MovieDisplay from './movieDisplayComp/MovieDisplay'
import { MovieDataCtx } from '../providers/MovieContext';
import { Link } from 'react-router-dom';

function Movie() {

	const { getRandomMovie } = useContext(MovieDataCtx)

return (
	<>
		<Link to="/"><FontAwesomeIcon className='back-btn' icon={faArrowLeft} /></Link>
		<div className="Music">
			<h1>CineDice</h1>
			<MovieDisplay />
			<FontAwesomeIcon icon={faDice} className='drawnBtn' onClick={getRandomMovie}/>
			<Optionals />
		</div>
	</>
  )
}

export default Movie
