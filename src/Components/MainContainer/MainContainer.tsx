import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { LocationsList } from '../List/LocationsList';
import { Header } from '../Header/Header';
import { LeafletMap } from '../Map/LeafletMap';
import './index.css';


export function MainContainer() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Header />
      </Grid>
      <Grid container spacing={2} className='main-container'>
        <Grid item md={5} xs={12}>
          <LocationsList />
        </Grid>

        <Grid item md={7} xs={12}>
          <Box sx={{ width: '100%', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '95%', height: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <LeafletMap />
            </Box>
          </Box>

        </Grid>
      </Grid>
    </Box>
  );
}