import {Container, Icon} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
// import Geocoder from 'react-native-geocoder';

import ChooseLocation from './ChooseLocation';

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

  function getCurrentLocation(currentLocation) {
    // const position = {
    //   lat: currentLocation.latitude,
    //   lng: currentLocation.longitude,
    // };
    // Geocoder.geocodePosition(position)
    //   .then((result) => {
    //     const streetNumber = result[0].streetNumber || '';
    //     const streetName = result[0].streetName || '';
    //     let location = `${streetNumber} ${streetName}`;
    //     if (location.trim() === '') location = result[0].formattedAddress;
    //     setStartLocation(location);
    //   })
    //   .catch((err) => console.log(err));
  }

  return (
    <Container>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        onRegionChangeComplete={(currentRegion) =>
          getCurrentLocation(currentRegion)
        }>
        <Circle
          center={initialCoordinate}
          radius={300}
          strokeColor="rgba(190, 210, 240, 0.8)"
          fillColor="rgba(190, 210, 240, 0.4)"
        />

        <Marker coordinate={initialCoordinate} anchor={{x: 0.5, y: 0.5}}>
          <Icon
            type="FontAwesome5"
            name="circle"
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
    color: '#215dd5',
    fontSize: 16,
  },
  chooseLocation: {
    position: 'absolute',
    bottom: 30,
    left: 15,
    right: 15,
  },
});

export default App;
