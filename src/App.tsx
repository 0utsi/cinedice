import {Routes, Route} from "react-router-dom";
import { GetRandomMovieProvider } from './providers/MovieContext';
import Movie from './Movie/Movie';
import Music from './Music/Music';
import Select from './Select/Select';

function App() {


return (
    <>
		<Routes>
			<Route path="/" element={<Select />} />
				<Route path="/movie" element={
						<GetRandomMovieProvider>
							<Movie />
						</GetRandomMovieProvider>
				} />
				<Route path="/music" element={<Music />} />
		</Routes>
    </>
  )
}

export default App
