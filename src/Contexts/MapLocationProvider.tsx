import React from 'react';
import { useGeoLocation } from '../Hooks/useGeoLocation';
import { LatLng } from 'leaflet';

type MapLocationProviderProps = {
    children: React.ReactNode;
}

type Location = {
    latitude: number;
    longitude: number;
}

type BoundLatLng = {
    sw: LatLng,
    ne: LatLng
}

type MapLocationContextType = {
    position: Location | EmptyObj;
    boundLatLng: BoundLatLng | null;
    geoLocationError: string;
    setBoundLatLng: Function;
    mapInstanceRef: React.MutableRefObject<any>;
}

const MapLocationContext = React.createContext<MapLocationContextType>({
    position: {},
    boundLatLng: null,
    geoLocationError: '',
    setBoundLatLng: Function,
    mapInstanceRef: { current: undefined }
});

type EmptyObj = Record<PropertyKey, never>;


export function MapLocationProvider({ children }: MapLocationProviderProps) {

    const { position, geoLocationError } = useGeoLocation();
    const [boundLatLng, setBoundLatLng] = React.useState<BoundLatLng | null>(null);
    const mapInstanceRef = React.useRef<any>();

    const contextProps = {
        position,
        geoLocationError,
        boundLatLng,
        setBoundLatLng,
        mapInstanceRef
    }

    return <MapLocationContext.Provider value={contextProps}>
        {children}
    </MapLocationContext.Provider>
}


export function useMapLocationContext() {
    return React.useContext(MapLocationContext);
}