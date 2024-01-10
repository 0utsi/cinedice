import '../App.css'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import Optionals from './OptionalsComp/Optionals';
import MovieDisplay from './movieDisplayComp/MovieDisplay'
import { MovieDataCtx } from '../providers/ApiContext';

function Movie() {

	const { getRandomMovie } = useContext(MovieDataCtx)

return (

		<div className="App">
			<h1>CineDice</h1>
			<MovieDisplay />
			<FontAwesomeIcon icon={faDice} className='drawnBtn' onClick={getRandomMovie}/>
			<Optionals />
		</div>

  )
}

export default Movie
