import { useContext, useState } from "react"
import Dice from "../DiceComp/Dice"
import { MovieDataCtx } from "../../providers/MovieContext"

const MovieDisplay = () => {
	const {movieData, isMovieVisible} = useContext(MovieDataCtx)
	const [imageLoaded, setImageLoaded] = useState(false)

	return(
	<>
		<Dice opacity={!isMovieVisible ? 1 : 0} />
		{movieData && (
        <div className="movie">
			<h2>{movieData.title}</h2>
				<img
					src={`https://image.tmdb.org/t/p/original/` + movieData.poster_path}
					alt={movieData.original_title}
					title={movieData.overview}
					style={{display: imageLoaded ? 'block' : 'none'}}
					onLoad={() => setImageLoaded(true)}
					/>
				<span className="date">{movieData.release_date}</span>
        </div>
      )}
	</>)

}

export default MovieDisplay;