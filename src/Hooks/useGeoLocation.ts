import React from "react";

export function useGeoLocation() {

    const [position, setPosition] = React.useState({});
    const [geoLocationError, setGeoLocationError] = React.useState('');

    React.useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(onPositionSuccess, onPositionError)
    }, []);


    function onPositionSuccess(event: any) {
        const { coords } = event;
        setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude
        });

    }

    function onPositionError(error: GeolocationPositionError) {
        setGeoLocationError(error.message);
    }


    return {
        position,
        geoLocationError
    }

}