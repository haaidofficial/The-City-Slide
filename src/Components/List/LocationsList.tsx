import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Box } from '@mui/material';
import './index.css';
import { CriteriaSelector } from './CriteriaSelector';
import { LocationCard } from '../Card/LocationCard';
import './index.css';
import { getPlaceData } from '../../Services/Api/locationTravelData';
import { SkeletonLoader } from '../Loaders/SkeletonLoader';
import { useMapLocationContext } from '../../Contexts/MapLocationProvider';
import L, { LatLng } from 'leaflet';
import fullStarIcon from '../../assets/icons/full-star.png';
import halfStarIcon from '../../assets/icons/half-star.png';
import { v4 as uuidv4 } from 'uuid';


type Location = {
  latitude: number;
  longitude: number;
}

type BoundLatLng = {
  sw: LatLng,
  ne: LatLng
}

export function LocationsList() {

  const [locationDataList, setLocationDataList] = React.useState([]);
  const [loadingStatus, setLoadingStatus] = React.useState({ display: 'loading' });
  const { position, boundLatLng, mapInstanceRef } = useMapLocationContext();


  React.useEffect(() => {
    if (Object.keys(position).length && boundLatLng) {
      const location = position as Location;
      const positionBound = boundLatLng as BoundLatLng;
      getPlaceDataHanler(location, positionBound)
    }
  }, [position, boundLatLng]);



  React.useEffect(() => {
    locationDataList.forEach((locationData: any, index: number) => {
      if (locationData.latitude && locationData.longitude) {
        setMarkerOnMap(parseFloat(locationData.latitude), parseFloat(locationData.longitude), locationData, index)
      }


    });
  }, [locationDataList]);


  async function getPlaceDataHanler(position: Location, positionBound: BoundLatLng) {
    try {

      setLoadingStatus({ display: 'loading' });
      const promise = await getPlaceData({
        coordinates: {
          latitude: position.latitude,
          longitude: position.longitude
        },
        boundries: {
          ne: positionBound.ne,
          sw: positionBound.sw
        },
        searchLocationType: { type: 'restaurants', rating: 'all' }.type
      });
      // debugger
      const response = await promise.json();

      if (response) {
        if (response.data) {
          const data = response.data;
          data.forEach((locationData: any, index: number) => {
            const markerId = uuidv4();
            locationData.markerId = markerId;
          });

          setLocationDataList(data);
          setLoadingStatus({ display: 'idle' });
        }
      }


    } catch (error) {
      console.log(error);
      setLoadingStatus({ display: 'idle' });

    }
  }

  function setMarkerOnMap(lat: number, lng: number, locationData: any, index: number) {

    let photo = '';
    if (locationData.photo) {
      if (locationData.photo.images) {
        if (locationData.photo.images.small) {
          if (locationData.photo.images.small.url) {
            photo = locationData.photo.images.small.url;
          }
        }
      }
    }

    const ratings = generateStarRatings(locationData.rating);
    const markerId = uuidv4();
    const html = `<div class="place-marker" id=location-data-marker-${locationData.markerId}>
                        <div class="marker-card-image">
                            <img src=${photo} style="width: 120px; height: 120px">
                            <div class="marker-data-header">
                            <span class="marker-card-title small-text on-map">
                            <b>${locationData.name}</b>
                            </span>
                            </div>
                        </div>
                        <div class="marker-card-content">
                           ${ratings}
                        </div>
                  </div>`;

    const icon = L.divIcon({
      className: 'custom-div-icon',
      html: html,
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    });

    L.marker([lat, lng], { icon: icon }).addTo(mapInstanceRef.current);

    document.querySelector(`#location-data-marker-${locationData.markerId}`)?.addEventListener('click', () => {

      elementScroller(locationData.markerId);
    });


  }


  function elementScroller(markerId: string) {
    const listItem = document.querySelector(`#location-data-${markerId}`) as HTMLElement;

    if (listItem) {
      listItem.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  function generateStarRatings(rating: string) {
    let ratings = "";
    if (rating) {

      const [fullStar, halfStar] = rating.split('.');

      if (fullStar) {
        for (let i = 0; i < parseInt(fullStar); i++) {

          ratings += `<img style="width: 12px; height: 12px" src=${fullStarIcon} alt='full star rating' />`;
        }
      }
      if (halfStar) {
        ratings += `<img style="width: 12px; height: 12px" src=${halfStarIcon} alt='half star rating' />`;
      }
    }


    return ratings;

  }

  function RepeatLoader() {
    return <>
      <div style={{ marginBottom: '10px' }}>
        <SkeletonLoader loading={loadingStatus.display === 'loading'} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <SkeletonLoader loading={loadingStatus.display === 'loading'} />
      </div>
    </>
  }

  const isLoading = loadingStatus.display === 'loading' ? true : false;



  return (
    <>

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: '10px' }}>
        <Box>
          <div className='location-list-header-text'>
            Restaurants, Hotels & Attractions around you
          </div>
        </Box>

        <CriteriaSelector />

      </Box>

      <Box sx={{ padding: '0 20px' }}>
        <List
          sx={{
            width: '100%',
            // maxWidth: 360,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 530,
            '& ul': { padding: 0 },
          }}
          className='location-card-list'
          subheader={<li />}
        >
          <RepeatLoader />
          {
            !isLoading && locationDataList.map((locationData: any, index) => {
              return <li key={index} id={`location-data-${locationData.markerId}`}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <LocationCard data={locationData} />
                </Box>
              </li>
            })
          }
          { }
        </List>

      </Box>
    </>
  );
}