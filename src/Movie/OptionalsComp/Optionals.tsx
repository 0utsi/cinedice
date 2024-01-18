import '../../App.css'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Select,
  MenuItem,
  OutlinedInput,
  TextField,
  Checkbox,
  ListItemText
} from '@mui/material';
import genres from '../../assets/genres.json';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { MovieDataCtx } from '../../providers/ApiContext';
import { format } from 'date-fns';

const Optionals = () => {
		const [isAccordionExpanded, setAccordionExpanded] = useState(false);
		const { setFilters } = useContext(MovieDataCtx);
		const [ excludedGenres, setExcludedGenres ] = React.useState<number[]>([]);
		const [ dateTo, setDateTo ] = useState('2023-10-10');
		const [ dateFrom, setDateFrom] = useState('1921-01-20');

		useEffect(() => {
			setFilters({
				excludedGenres: excludedGenres,
				releaseYearRange: {start: dateFrom, end: dateTo}
			})

			console.log(excludedGenres, dateFrom, dateTo)

		}, [excludedGenres, dateFrom, dateTo, setFilters])

		const handleAccordionChange = () => {
			setAccordionExpanded(!isAccordionExpanded);

		};

		const mapIdToGenre = (id: number): string => {
			const genre = genres.find((genre) => genre.id === id);
			return genre ? genre.name : '';
		};

		const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const selectedDate = new Date(e.target.value);
			const minDate = new Date('1921-01-20');
			const maxDate = new Date(dateTo || '2023-10-10');

			if (
				selectedDate >= minDate &&
				selectedDate <= maxDate &&
				selectedDate.getFullYear() + 1 <= maxDate.getFullYear()
			) {
				const formattedDate = format(selectedDate, 'yyyy-MM-dd');
				setDateFrom(formattedDate);
			}
		};

		const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const selectedDate = new Date(e.target.value);
			const minDate = new Date(dateFrom || '1921-01-20');
			const maxDate = new Date('2023-10-10');

			if (
				selectedDate >= minDate &&
				selectedDate <= maxDate &&
				selectedDate.getFullYear() >= minDate.getFullYear() + 1
			) {
				const formattedDate = format(selectedDate, 'yyyy-MM-dd');
				setDateTo(formattedDate);
			}
		};


		const handleSelectChange = (selected: Array<number>) => {
			setExcludedGenres(selected);
		};

  return (
    <div className="optionals">
      <Accordion
        expanded={isAccordionExpanded}
        onChange={handleAccordionChange}
        sx={{
          marginBottom: 0.5,
          flexDirection: 'column-reverse',
          width: '17rem',
          color: 'white',
          backgroundColor: '#261f1f',
          opacity: '0.5'
        }}
      >
        <AccordionSummary
          expandIcon={
            <svg
              height="24"
              className="expandIco"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
            </svg>
          }
          id="panel1a-header"
        >
          <Typography style={{ color: 'white', margin: 0, padding: 0 }}>
            Optionals
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{ color: 'white', zIndex: 1000, padding: 1, margin: 1, marginTop: -35 }}
        >
          <Select
            multiple
            value={excludedGenres}
            style={{
              color: 'white',
              width: '100%',
              height: '2rem',
              marginBottom: '10px',
              fontSize: '12px',
              marginTop: 0,
              textAlign: 'center'
            }}
            sx={{
              input: { color: 'white' },
              "& .MuiSelect-icon": {
                color: 'white',
                transform: 'rotate(180deg)',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: '#751616',
                  height: '40rem',
                  '& .MuiMenuItem-root': {
                    padding: 0,
                    color: "white",
                  },
                },
              },
            }}
            onChange={(e) => handleSelectChange(e.target.value as Array<number>)}
			renderValue={(selected: Array<number>) => selected.map((id) => mapIdToGenre(id)).join(', ') }
            input={<OutlinedInput />}
          >
            <MenuItem disabled>
              <em style={{ textAlign: 'center', width: '100%', fontWeight: 'bold', textDecoration: 'underline' }}>
                I DON'T LIKE:
              </em>
            </MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                <Checkbox checked={excludedGenres.indexOf(genre.id) > -1} />
                <ListItemText primary={genre.name} />
              </MenuItem>
            ))}
          </Select>
          <div className="dates">
            <TextField
              type="date"
              variant="outlined"
              size="small"
              style={{ width: '50%' }}
              sx={{ input: { color: 'white', fontSize: '11px' } }}
              value={dateFrom}
              onChange={handleDateFromChange}
            />
            <span className="fromTo">-</span>
            <TextField
              type="date"
              variant="outlined"
              size="small"
              style={{ width: '50%' }}
              sx={{ input: { color: 'white', fontSize: '11px' } }}
              value={dateTo}
              onChange={handleDateToChange}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Optionals;
