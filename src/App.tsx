import Movie from './Movie/Movie';
import { GetRandomMovieProvider } from './providers/ApiContext';
function App() {


return (
    <>
		<GetRandomMovieProvider>
			<Movie />
		</GetRandomMovieProvider>
    </>
  )
}

export default App
