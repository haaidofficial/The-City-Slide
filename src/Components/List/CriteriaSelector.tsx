import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';
import './index.css';

const criteria = [{
    label: 'Type', value: 'type', items: [
        'Restaurants',
        'Hotels',
        'Attractions'
    ]
}, {
    label: 'Rating', value: 'rating', items: [
        'All',
        'Above 3.0',
        'Above 4.0',
        'Above 4.5'
    ]
}];


export function CriteriaSelector() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };



    return (
        <Box className='criteria-container'>
            {
                criteria.map((formControl, index) => {
                    return <FormControl className='criteria-container-formcontrol' key={index} required sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-required-label">{formControl.label}</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={formControl.value}
                            label={formControl.label}
                            onChange={handleChange}
                            variant="standard"
                        >
                            {
                                formControl.items.map((item, index2) => {
                                    return <MenuItem key={index2} value={10}>{item}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                })
            }
        </Box>
    );
}