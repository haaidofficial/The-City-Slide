import React from 'react';
import L, { LatLng, LatLngBounds, LeafletEvent, LeafletEventHandlerFn } from 'leaflet';
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

type BoundLatLng = {
    sw: LatLng,
    ne: LatLng
}

type EmptyObj = Record<PropertyKey, never>;

export function LeafletMap() {
    const { position, geoLocationError, setBoundLatLng, mapInstanceRef } = useMapLocationContext();
    const [toastAlertStatus, setToastAlertStatus] = React.useState({ show: false, message: '', variant: '' });

    React.useEffect(() => {
        mapInstanceRef.current = L.map('map');

        mapInstanceRef.current.addEventListener('moveend', moveMapHandler);


    }, []);

    React.useEffect(() => {

        initOpenSteetMap(position);

    }, [position]);

    React.useEffect(() => {

        if (geoLocationError) {
            setToastAlertStatus({ show: true, message: geoLocationError, variant: '#FF3333' });
        }

    }, [geoLocationError]);

    function initOpenSteetMap(position: (Position | EmptyObj)) {

        if (Object.keys(position).length) {

            mapInstanceRef.current.setView([position.latitude, position.longitude], 13);

            L.tileLayer(OPEN_STREET_MAP_CDN, {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapInstanceRef.current);


            const bounds: LatLngBounds = mapInstanceRef.current.getBounds();

            // setMarkerOnMap();
            getLatLngBounds(bounds);

        }

    }

    function getLatLngBounds(bounds: LatLngBounds) {
        setBoundLatLng({
            ne: bounds.getNorthEast(),
            sw: bounds.getSouthWest()
        });
    }


    function moveMapHandler(event: LeafletEvent) {
        getLatLngBounds(event.target.getBounds());
    }


    function setMarkerOnMap() {
        const icon = L.divIcon({
            className: 'custom-div-icon',
            html: "<div style='width: 400px; height: 400px; background-color:red;' class='marker-pin'></div><i class='material-icons'>weekend</i>",
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });

        L.marker([28.7291668754374, 77.00915614009998], { icon: icon }).addTo(mapInstanceRef.current);

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