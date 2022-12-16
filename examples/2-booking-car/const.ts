import {LatLng, Region} from 'react-native-maps';

// https://developers.google.com/maps/documentation/geocoding/get-api-key
export const GOOGLE_MAPS_APIKEY = 'Your API KEY';

export const initialCoordinate: LatLng = {
  latitude: 20.9980766,
  longitude: 105.7922312,
};

export const initialRegion: Region = {
  latitude: initialCoordinate.latitude,
  longitude: initialCoordinate.longitude,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export const initialLocation: string = 'Hà Nội, Vietnam';
