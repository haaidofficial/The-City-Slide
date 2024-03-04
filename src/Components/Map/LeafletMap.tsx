import React from 'react';
import L, { LatLngBounds, LeafletEvent } from 'leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';
import './index.css';
import { APP_CONSTANTS } from '../../Constants/AppConstants';
import { ToastAlert } from '../Alert/ToastAlert';
import { useMapLocationContext } from '../../Contexts/MapLocationProvider';

const OPEN_STREET_MAP_CDN = APP_CONSTANTS.OPEN_STREET_MAP_CDN as string;

type Position = {
    latitude: number;
    longitude: number;
}


type EmptyObj = Record<PropertyKey, never>;

export function LeafletMap() {
    const { position, geoLocationError, setBoundLatLng, mapInstanceRef } = useMapLocationContext();
    const [toastAlertStatus, setToastAlertStatus] = React.useState({ show: false, message: '', variant: '' });

    const getLatLngBounds = React.useCallback((bounds: LatLngBounds) => {
        setBoundLatLng({
            ne: bounds.getNorthEast(),
            sw: bounds.getSouthWest()
        });
    }, []);
    
    React.useEffect(() => {
        mapInstanceRef.current = L.map('map');

        mapInstanceRef.current.addEventListener('moveend', moveMapHandler);


    }, []);

    const initOpenSteetMap = React.useCallback((position: (Position | EmptyObj)) => {
        if (Object.keys(position).length) {

            mapInstanceRef.current.setView([position.latitude, position.longitude], 13);

            L.tileLayer(OPEN_STREET_MAP_CDN, {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapInstanceRef.current);


            const bounds: LatLngBounds = mapInstanceRef.current.getBounds();

            getLatLngBounds(bounds);

        }

    }, [mapInstanceRef, getLatLngBounds]);


    React.useEffect(() => {

        initOpenSteetMap(position);

    }, [position, mapInstanceRef, initOpenSteetMap]);

    React.useEffect(() => {

        if (geoLocationError) {
            setToastAlertStatus({ show: true, message: geoLocationError, variant: '#FF3333' });
        }

    }, [geoLocationError]);







    function moveMapHandler(event: LeafletEvent) {
        getLatLngBounds(event.target.getBounds());
    }

    return (
        <>
            <ToastAlert status={toastAlertStatus} />
            <div className='map-container'>
                <div id='map'>

                </div>
            </div>
        </>
    )
}