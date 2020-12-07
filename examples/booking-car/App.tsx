import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {Container, Icon} from 'native-base';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Region,
} from 'react-native-maps';
import Geocoder from 'react-native-geocoder';

import ChooseLocation from './ChooseLocation';
import {GeoCodingResult} from './model';

const App: React.FunctionComponent = () => {
  const initialCoordinate = {
    latitude: 20.99848524,
    longitude: 105.79469706,
  };
  const initialRegion = {
    latitude: 20.99848524,
    longitude: 105.79469706,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  // const [pinCoordinate, setPinCoordinate] = useState(initialCoordinate);
  const [startLocation, setStartLocation] = useState('');
  const [isKeyboardDidShow, setKeyboardDidShow] = useState(false);

  async function getCurrentLocation(currentLocation: Region) {
    const position = {
      lat: currentLocation.latitude,
      lng: currentLocation.longitude,
    };

    Geocoder.geocodePosition(position)
      .then((results: GeoCodingResult[]) => {
        const result = results[0];
        const streetNumber = result.streetNumber || '';
        const streetName = result.streetName || '';
        let location = `${streetNumber} ${streetName}`;
        if (location.trim() === '') {
          location = result.formattedAddress;
        }

        setStartLocation(location);
      })
      .catch((err: Error) => console.log(err));
  }

  function keyboardWillShow() {
    setKeyboardDidShow(true);
  }

  function keyboardDidShow() {
    console.log('did');
    // setKeyboardDidShow(true);
  }

  function keyboardDidHide() {
    setKeyboardDidShow(false);
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidHideListener.remove();
    };
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
          radius={300}
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
      </MapView>

      <View style={styles.mapPinWrapper} pointerEvents="box-none">
        <Icon type="FontAwesome5" name="map-pin" style={styles.mapPin} />
      </View>

      <View style={styles.chooseLocation}>
        <ChooseLocation
          startLocation={startLocation}
          setStartLocation={setStartLocation}
        />
      </View>
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
  },
  currentLocationMarker: {
    color: '#4682fe',
    fontSize: 16,
  },
  chooseLocation: {
    position: 'absolute',
    bottom: 35,
    left: 15,
    right: 15,
  },
});

export default App;
