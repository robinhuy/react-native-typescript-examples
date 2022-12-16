import React, {FC, useEffect, useRef, useState, useCallback} from 'react';
import {StyleSheet, View, Animated, Keyboard, KeyboardEvent, Dimensions} from 'react-native';
import {Box, Icon} from 'native-base';
import MapView, {PROVIDER_GOOGLE, Marker, Circle, Region, LatLng} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import ChooseLocation from './ChooseLocation';
import {reverseGeoCoding} from './googleAPI';
import {GOOGLE_MAPS_APIKEY, initialRegion, initialCoordinate, initialLocation} from './const';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';

const Main: FC = () => {
  const [startLocation, setStartLocation] = useState<string>(initialLocation);
  const [endLocation, setEndLocation] = useState<string>('');
  const [startCoordinate, setStartCoordinate] = useState<LatLng>(initialCoordinate);
  const [endCoordinate, setEndCoordinate] = useState<LatLng>(initialCoordinate);
  const [destination, setDestination] = useState<LatLng>(initialCoordinate);
  const [isBooked, setBooked] = useState<boolean>(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const mapViewRef = useRef(null);

  const chooseDestination = async (currentLocation: Region) => {
    const {latitude, longitude} = currentLocation;

    if (
      Math.round(latitude * 100) === Math.round(startCoordinate.latitude * 100) &&
      Math.round(longitude * 100) === Math.round(startCoordinate.longitude * 100)
    ) {
      return;
    }

    const coordinate = {latitude, longitude};
    setEndCoordinate(coordinate);

    const location = await reverseGeoCoding(latitude, longitude);
    setEndLocation(location.results[0].formatted_address);
  };

  const confirmBooking = () => {
    setBooked(true);
    setDestination(endCoordinate);
    Keyboard.dismiss();
  };

  const keyboardWillShow = useCallback(
    (event: KeyboardEvent) => {
      Animated.timing(slideAnimation, {
        useNativeDriver: true,
        toValue: -event.endCoordinates.height,
        duration: 100,
      }).start();
    },
    [slideAnimation],
  );

  const keyboardWillHide = useCallback(() => {
    Animated.timing(slideAnimation, {
      useNativeDriver: true,
      toValue: 0,
      duration: 100,
    }).start();
  }, [slideAnimation]);

  useEffect(() => {
    // https://reactnative.dev/docs/keyboard
    const showSubscription = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    const hideSubscription = Keyboard.addListener('keyboardWillHide', keyboardWillHide);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardWillHide, keyboardWillShow]);

  return (
    // https://docs.nativebase.io/Components.html#anatomy-headref
    <Box flex={1}>
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
          <Icon name="dot-circle" as={FontAwesome5} size={16} color="#4682fe" />
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
              <Icon name="map-marker-alt" as={FontAwesome5} size={26} color="#e74c3c" />
            </Marker>
          </>
        )}
      </MapView>

      <View style={styles.mapPinWrapper} pointerEvents="box-none">
        <Icon name="map-pin" as={FontAwesome5} style={styles.mapPin} />
      </View>

      <Animated.View style={[styles.chooseLocation, {transform: [{translateY: slideAnimation}]}]}>
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
    </Box>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
  chooseLocation: {
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 30,
  },
});

export default Main;
