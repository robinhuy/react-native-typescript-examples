import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  KeyboardEvent,
  Animated,
} from 'react-native';
import {Container, Icon} from 'native-base';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Region,
  LatLng,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoder';

import ChooseLocation from './ChooseLocation';
import {GeoCodingResult} from './model';
import {
  GOOGLE_MAPS_APIKEY,
  initialCoordinate,
  initialRegion,
  initialLocation,
} from './const';

const App: React.FunctionComponent = () => {
  const [startLocation, setStartLocation] = useState<string>(initialLocation);
  const [endLocation, setEndLocation] = useState<string>('');
  const [startCoordinate, setStartCoordinate] = useState<LatLng | ''>(
    initialCoordinate,
  );
  const [endCoordinate, setEndCoordinate] = useState<LatLng | ''>('');
  const [endDestination, setEndDestination] = useState<LatLng | ''>('');
  const [isBooked, setBooked] = useState<boolean>(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  async function getCurrentLocation(currentLocation: Region) {
    const {latitude, longitude} = currentLocation;

    if (
      Math.round(latitude * 100) ===
        Math.round(initialCoordinate.latitude * 100) &&
      Math.round(longitude * 100) ===
        Math.round(initialCoordinate.longitude * 100)
    ) {
      return;
    }

    const position = {
      lat: latitude,
      lng: longitude,
    };
    const coordinate = {latitude, longitude};

    setEndCoordinate(coordinate);

    Geocoder.geocodePosition(position)
      .then((results: GeoCodingResult[]) => {
        const result = results[0];
        const streetNumber = result.streetNumber || '';
        const streetName = result.streetName || '';
        let location = `${streetNumber} ${streetName}`;
        if (location.trim() === '') {
          location = result.formattedAddress;
        }

        setEndLocation(location);
      })
      .catch((err: Error) => console.log(err));
  }

  function confirmBooking() {
    setBooked(true);
    setEndDestination(endCoordinate);
  }

  function keyboardWillShow(event: KeyboardEvent) {
    Animated.timing(slideAnimation, {
      useNativeDriver: true,
      toValue: -event.endCoordinates.height,
      duration: 100,
    }).start();
  }

  function keyboardWillHide() {
    Animated.timing(slideAnimation, {
      useNativeDriver: true,
      toValue: 0,
      duration: 100,
    }).start();
  }

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', keyboardWillHide);

    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={true}
        loadingEnabled={true}
        onRegionChangeComplete={getCurrentLocation}>
        <Circle
          center={initialCoordinate}
          radius={100}
          strokeColor="rgba(190, 210, 240, 0.8)"
          fillColor="rgba(190, 210, 240, 0.4)"
        />

        <Marker coordinate={initialCoordinate} anchor={{x: 0.5, y: 0.5}}>
          <Icon
            type="FontAwesome5"
            name="dot-circle"
            solid={true}
            style={styles.currentLocationMarker}
          />
        </Marker>

        {isBooked && (
          <>
            <MapViewDirections
              origin={startCoordinate}
              destination={endDestination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="#4595ff"
            />

            <Marker coordinate={endDestination} anchor={{x: 0.5, y: 0.5}}>
              <Icon
                type="FontAwesome5"
                name="map-marker-alt"
                solid={true}
                style={styles.destinationLocationMarker}
              />
            </Marker>
          </>
        )}
      </MapView>

      <View style={styles.mapPinWrapper} pointerEvents="box-none">
        <Icon type="FontAwesome5" name="map-pin" style={styles.mapPin} />
      </View>

      <Animated.View
        style={[
          styles.chooseLocation,
          {transform: [{translateY: slideAnimation}]},
        ]}>
        <ChooseLocation
          startLocation={startLocation}
          endLocation={endLocation}
          setStartLocation={setStartLocation}
          setEndLocation={setEndLocation}
          confirmBooking={confirmBooking}
        />
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapPinWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPin: {
    color: '#44b9e9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  currentLocationMarker: {
    color: '#4682fe',
    fontSize: 16,
  },
  destinationLocationMarker: {
    color: '#e74c3c',
    fontSize: 26,
  },
  chooseLocation: {
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 30,
  },
});

export default App;
