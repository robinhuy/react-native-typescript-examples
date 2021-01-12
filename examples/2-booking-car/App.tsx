import React, {FC, useEffect, useRef, useState} from 'react';
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
import ChooseLocation from './ChooseLocation';
import {
  GOOGLE_MAPS_APIKEY,
  initialCoordinate,
  initialRegion,
  initialLocation,
} from './const';
import {reverseGeoCoding} from './googleAPI';

const App: FC = () => {
  const [startLocation, setStartLocation] = useState<string>(initialLocation);
  const [endLocation, setEndLocation] = useState<string>('');
  const [startCoordinate, setStartCoordinate] = useState<LatLng>(
    initialCoordinate,
  );
  const [endCoordinate, setEndCoordinate] = useState<LatLng>(initialCoordinate);
  const [destination, setDestination] = useState<LatLng>(initialCoordinate);
  const [isBooked, setBooked] = useState<boolean>(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const mapViewRef = useRef(null);

  async function chooseDestination(currentLocation: Region) {
    const {latitude, longitude} = currentLocation;

    if (
      Math.round(latitude * 100) ===
        Math.round(startCoordinate.latitude * 100) &&
      Math.round(longitude * 100) ===
        Math.round(startCoordinate.longitude * 100)
    ) {
      return;
    }

    const coordinate = {latitude, longitude};
    setEndCoordinate(coordinate);

    const location = await reverseGeoCoding(latitude, longitude);
    setEndLocation(location.results[0].formatted_address);
  }

  function confirmBooking() {
    setBooked(true);
    setDestination(endCoordinate);
    Keyboard.dismiss();
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
    // https://reactnative.dev/docs/keyboard
    Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', keyboardWillHide);

    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // https://docs.nativebase.io/Components.html#anatomy-headref
    <Container>
      {/* https://github.com/react-native-maps/react-native-maps */}
      <MapView
        ref={mapViewRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={true}
        loadingEnabled={true}
        onRegionChangeComplete={chooseDestination}>
        <Circle
          center={startCoordinate}
          radius={100}
          strokeColor="rgba(190, 210, 240, 0.8)"
          fillColor="rgba(190, 210, 240, 0.4)"
        />
        <Marker coordinate={startCoordinate} anchor={{x: 0.5, y: 0.5}}>
          <Icon
            type="FontAwesome5"
            name="dot-circle"
            solid={true}
            style={styles.currentLocationMarker}
          />
        </Marker>

        {isBooked && (
          <>
            {/* https://github.com/bramus/react-native-maps-directions */}
            <MapViewDirections
              origin={startCoordinate}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="#4595ff"
            />

            <Marker coordinate={destination} anchor={{x: 0.5, y: 0.5}}>
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
          setStartCoordinate={setStartCoordinate}
          setEndCoordinate={setEndCoordinate}
          confirmBooking={confirmBooking}
          mapView={mapViewRef.current}
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
