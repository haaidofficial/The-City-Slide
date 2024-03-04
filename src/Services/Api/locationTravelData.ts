import { LatLng } from "leaflet";

type Location = {
    latitude: number;
    longitude: number;
}

type BoundLatLng = {
    sw: LatLng,
    ne: LatLng
}

type PlaceDataInputType = {
    coordinates: Location;
    boundries: BoundLatLng;
    searchLocationType: string;
    rating?: string;
}



export async function getPlaceData(payload: PlaceDataInputType) {


    // debugger
    const urlSearchParams = new URLSearchParams({
        // bl_latitude: sw.lat,
        // bl_longitude: sw.lng,
        // tr_latitude: ne.lat,
        // tr_longitude: ne.lng,
        bl_latitude: payload.boundries.sw.lat.toString(),
        bl_longitude: payload.boundries.sw.lng.toString(),
        tr_latitude: payload.boundries.ne.lat.toString(),
        tr_longitude: payload.boundries.ne.lng.toString(),
        restaurant_tagcategory_standalone: '10591',
        restaurant_tagcategory: '10591',
        // offset: '30'
        limit: '30',
        currency: 'USD',
        open_now: 'false',
        lunit: 'km',
        lang: 'en_US'
    });

    return fetch(`https://travel-advisor.p.rapidapi.com/${payload.searchLocationType}/list-in-boundary?${urlSearchParams}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': 'db3ff975fcmsh40b889cd4775810p12a573jsna376596d132f'
        }
    });
}
