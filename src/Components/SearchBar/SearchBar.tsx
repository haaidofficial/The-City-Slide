import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from '../../Utils/debounce';
import { useMapLocationContext } from '../../Contexts/MapLocationProvider';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '60%'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


const OpenStreetMapInstance = new OpenStreetMapProvider();




export function SearchBar() {

    const [autocompletePlaces, setAutocompletePlaces] = React.useState<any[]>([]);
    const [inputSearch, setInputSearch] = React.useState('');
    const openStreetMapProviderRef = React.useRef<any>();
    const { setBoundLatLng, setPosition } = useMapLocationContext();

    async function handleInputChange(event: any, value: any) {

        try {
            const results = await OpenStreetMapInstance.search({ query: value });

            if (results) {
                setAutocompletePlaces(results);
            }
        } catch (error) {
            console.log(error)
        }



    }



    function selectPlaceInfo(event: any, newValue: any) {
        if (newValue) {
            setPosition({
                latitude: newValue.lat,
                longitude: newValue.long
            });
        }

    }
    return (
        <Search>
            <Autocomplete
                // id="free-solo-demo"
                // freeSolo
                // onChange={handleChange}
                onInputChange={handleInputChange}
                onChange={selectPlaceInfo}
                options={autocompletePlaces.map((option: any) => {
                    let lat = '';
                    let long = '';
                    let label = '';
                    if (option) {
                        if (option.raw) {
                            lat = option.raw.lat;
                            long = option.raw.lon;
                            label = option.label;
                        }
                    }

                    return { lat, long, label }

                })}
                renderInput={(params: any) => {
                    return <TextField {...params} label="search place" />
                }}
            />
        </Search>
    )
}