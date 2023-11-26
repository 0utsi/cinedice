import './App.css'
import axios from 'axios'
import Dice from './DiceComp/Dice';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import movieData from './interfaces/movieData';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Select, MenuItem, SelectChangeEvent, OutlinedInput, TextField, Checkbox, ListItemText} from '@mui/material';
import React from 'react';
import genres from './assets/genres.json'


function App() {
	const [movie, setMovie] = useState<movieData | undefined>(undefined)
	const [isMovieVisible, setIsMovieVisible] = useState(true)
	const [isAccordionExpanded, setAccordionExpanded] = useState(false);
	const [dateFrom, setDateFrom] = useState('1920-01-01');
	const [dateTo, setDateTo] = useState('2023-10-10');
	const [dontLike, setDontLike] = React.useState<string[]>([]);
	const drawMovie = () => {
		setIsMovieVisible(false);
		setMovie(undefined);
		console.log(dontLike)
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

	const handleAccordionChange = () => {
		setAccordionExpanded(!isAccordionExpanded);
	};

	const handleChange = (event: SelectChangeEvent<typeof dontLike>) => {
		const {
			target: { value },
		} = event;
		setDontLike(
			typeof value === 'string' ? value.split(',') : value,
		);
	};

	const handleDateFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDateFrom(event.target.value);
	};

	const handleDateToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDateTo(event.target.value);
	};

  return (
    <>
	<div className="App">
		<h1>CineDice</h1>
		<Dice opacity={!isMovieVisible ? 1 : 0} />
		{movie && (
        <div className="movie">
			<h2>{movie.title}</h2>
				<img src={movie.poster} alt={movie.title} style={{ width: '320px', height: '480px' }} title={movie.overview} />
				<span className="date">{movie.release_date}</span>
        </div>
      )}
		<FontAwesomeIcon icon={faDice} className='drawnBtn' onClick={drawMovie} style={{ color: '#dcdde0', width: '30px' }} />
		<div className="optionals">
			<Accordion expanded={isAccordionExpanded} onChange={handleAccordionChange}  sx={{borderRadius: 5, overflow: 'hidden', marginBottom: 0.5, flexDirection: 'column-reverse', width: '17rem', color: 'white', backgroundColor: '#520e0e', opacity: '0.7' }}  >
				<AccordionSummary expandIcon={<svg height="24" className='expandIco' viewBox="0 0 24 24" width="24"><path  d="M0 0h24v24H0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>} id="panel1a-header">
					<Typography style={{ color: 'white', margin: 0, padding: 0}}>Optionals</Typography>
				</AccordionSummary>
			<AccordionDetails style={{ color: 'white', zIndex: 1000, padding: 1, margin: 1, position: 'relative', marginTop: -25}}  >
					<Select
						className='select'
						multiple
						value={dontLike}
						style={{ color: 'white', width: '100%', height: '2rem', marginBottom: '20px', fontSize: '12px', marginTop: 0}}
						sx={{ input: { color: 'white', fontSize: '11px' },
							"& .MuiOutlinedInput-notchedOutline": {
							border: "1px solid white",
							},
							"&.Mui-focused": {
							"& .MuiOutlinedInput-notchedOutline": {
							border: "1px solid white"
							}
						} }}
						onChange={handleChange}
						renderValue={(selected) => selected.join(', ')}
						input={<OutlinedInput />}
					>
					{genres.map((genre) => (
						<MenuItem
							key={genre.id}
							value={genre.name}
						>
							<Checkbox checked={dontLike.indexOf(genre.name) > -1} />
							<ListItemText primary={genre.name} />
						</MenuItem>
						))}
					</Select>
					<div className="dates">
						<TextField
							type='date'
							variant="outlined"
							size="small"
							style={{ width: '50%'}}
							sx={{ input: { color: 'white', fontSize: '11px' },
								"& .MuiOutlinedInput-notchedOutline": {
									border: "1px solid white",
							},
								"&.Mui-focused": {
								"& .MuiOutlinedInput-notchedOutline": {
									border: "1px solid white",
							}
							} }}
							value={dateFrom}
							onChange={handleDateFromChange}
						/>
						<span className="fromTo">-</span>
						<TextField
							type='date'
							variant="outlined"
							size="small"
							style={{  width: '50%'}}
							sx={{ input: { color: 'white', fontSize: '11px' },
								"& .MuiOutlinedInput-notchedOutline": {
									border: "1px solid white",
							},
								"&.Mui-focused": {
								"& .MuiOutlinedInput-notchedOutline": {
									border: "1px solid white",
								}
							} }}
							value={dateTo}
							onChange={handleDateToChange}
						/>
					</div>
			</AccordionDetails>
        </Accordion>
		</div>
	</div>
    </>
  )
}

export default App
