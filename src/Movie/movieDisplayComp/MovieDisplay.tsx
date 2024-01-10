import { useContext } from "react"
import Dice from "../../DiceComp/Dice"
import { MovieDataCtx } from "../../providers/ApiContext"

const MovieDisplay = () => {

	const {movieData, isMovieVisible} = useContext(MovieDataCtx)

	return(
	<>
		<Dice opacity={!isMovieVisible ? 1 : 0} />
		{movieData && (
        <div className="movie">
			<h2>{movieData.title}</h2>
				<img src={`https://image.tmdb.org/t/p/original/` + movieData.poster_path} alt={movieData.original_title} title={movieData.overview}/>
				<span className="date">{movieData.release_date}</span>
        </div>
      )}
	</>)

}

export default MovieDisplay;