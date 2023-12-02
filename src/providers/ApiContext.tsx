import { createContext, useState } from "react";
import { MovieData } from "../interfaces/movieData";
import React from "react";
import axios from "axios";

interface DataContextProps {
  movieData?: MovieData | undefined;
  filters: {
		excludedGenres: number[],
		releaseYearRange: { start: string, end: string }
  };
  setFilters: React.Dispatch<React.SetStateAction<{
		excludedGenres: number[],
		releaseYearRange: {
			start: string,
			end: string
		}
	}>>;
  getRandomMovie: () => void;
  isMovieVisible: boolean;
}

const MovieDataCtx = createContext<DataContextProps>({
		movieData: undefined,
		filters: { excludedGenres: [], releaseYearRange: { start: '1921-01-01', end: '2023-10-10'} },
		setFilters: () => {},
		getRandomMovie: () => {},
		isMovieVisible: false,
});

	export function GetRandomMovieProvider({ children }: { children: React.ReactNode }) {
	const [movieData, setMovieData] = useState<MovieData | undefined>();
	const [isMovieVisible, setIsMovieVisible] = useState(true);
	const [filters, setFilters] = useState<{
		excludedGenres: number[];
		releaseYearRange: { start: string; end: string };
	}>({
		excludedGenres: [],
		releaseYearRange: { start: '1921-01-01', end: '2023-10-10' },
	});

	const getRandomMovie = () => {
		setIsMovieVisible(false)
		setMovieData(undefined);
		console.log(filters)
		axios
			.post('https://cinedice.cyclic.app/movies', filters)
			.then((res) => {
				setTimeout(() => showResult(res.data), 600);
			})
			.catch((err) => {
				console.error(err);
			})
	};

	const showResult = (data: MovieData) => {
			setIsMovieVisible(true);
			setMovieData(data);
	};

		return (
			<MovieDataCtx.Provider
				value={{
					movieData,
					filters,
					setFilters,
					getRandomMovie,
					isMovieVisible,
				}}
			>
			{children}
			</MovieDataCtx.Provider>
		);
}

export { MovieDataCtx };
