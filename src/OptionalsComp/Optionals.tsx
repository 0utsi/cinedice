import '../App.css'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  OutlinedInput,
  TextField,
  Checkbox,
  ListItemText
} from '@mui/material';
import genres from '../assets/genres.json';
import { useState } from 'react';
import React from 'react';

const Optionals = () => {
		const [isAccordionExpanded, setAccordionExpanded] = useState(false);
		const [dateFrom, setDateFrom] = useState('1921-01-20');
		const [dateTo, setDateTo] = useState('2023-10-10');
		const [dontLike, setDontLike] = React.useState<number[]>([]);

		const handleAccordionChange = () => {
			setAccordionExpanded(!isAccordionExpanded);

		};
		const handleChange = (event: SelectChangeEvent<number[]>) => {
			const {
			target: { value },
			} = event;

			const selectedValues = Array.isArray(value)
			? value.map((val) => Number(val))
			: [Number(value)];

			const limitedSelection = selectedValues.slice(0, 10);
			console.log(limitedSelection)
			setDontLike(limitedSelection);
		};

		const mapIdToGenre = (id: number): string => {
			const genre = genres.find((genre) => genre.id === id);
			return genre ? genre.name : '';
		};

		const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const selectedDate = new Date(e.target.value);
			const minDate = new Date('1921-01-20');
			const maxDate = new Date(dateTo);

			if (
				selectedDate >= minDate &&
				selectedDate <= maxDate &&
				selectedDate.getFullYear() + 1 <= maxDate.getFullYear()
			) {
				setDateFrom(selectedDate.toISOString().split('T')[0]);
			}

		};

		const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const selectedDate = new Date(e.target.value);
			const minDate = new Date(dateFrom);
			const maxDate = new Date('2023-10-10');

			if (
				selectedDate >= minDate &&
				selectedDate <= maxDate &&
				selectedDate.getFullYear() >= minDate.getFullYear() + 1
			) {
				console.log(selectedDate.toISOString().split('T')[0])
				setDateTo(selectedDate.toISOString().split('T')[0]);
			}
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
          backgroundColor: '#520e0e',
          opacity: '0.7'
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
            value={dontLike}
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
            onChange={handleChange}
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
                <Checkbox checked={dontLike.indexOf(genre.id) > -1} />
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
