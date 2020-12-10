import {LatLng, Region} from 'react-native-maps';

// https://developers.google.com/maps/documentation/geocoding/get-api-key
export const GOOGLE_MAPS_APIKEY = 'AIzaSyCTpJwHhRiSNGhobAggwnqI8Laa6M8SjN0';

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

export const initialLocation: string =
  '48 Tố Hữu, Trung Văn, Từ Liêm, Hà Nội, Vietnam';
