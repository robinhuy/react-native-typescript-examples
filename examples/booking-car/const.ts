import {LatLng, Region} from 'react-native-maps';

export const GOOGLE_MAPS_APIKEY = 'XXX';

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
