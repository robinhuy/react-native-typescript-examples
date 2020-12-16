import {GOOGLE_MAPS_APIKEY} from './const';

// https://cloud.google.com/maps-platform/maps
const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

export interface GeoCodingResponse {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export async function geoCoding(address: string) {
  const response = await fetch(
    `${BASE_URL}address=${address}&components=country:VN&key=${GOOGLE_MAPS_APIKEY}`,
  );
  const data = await response.json();
  return data.results;
}

export async function reverseGeoCoding(latitude: number, longtitue: number) {
  const response = await fetch(
    `${BASE_URL}latlng=${latitude},${longtitue}&language=vi&key=${GOOGLE_MAPS_APIKEY}`,
  );
  const data = await response.json();
  return data;
}
