import React, {Dispatch, SetStateAction, useState} from 'react';
import {Keyboard, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Button,
  Card,
  CardItem,
  Col,
  Grid,
  Icon,
  Input,
  Item,
  Text,
  View,
} from 'native-base';
import MapView, {LatLng} from 'react-native-maps';
import {geoCoding, GeoCodingResponse} from './googleAPI';

interface ChooseLocationProps {
  startLocation: string;
  endLocation: string;
  mapView: MapView | null;
  setStartLocation: Dispatch<SetStateAction<string>>;
  setEndLocation: Dispatch<SetStateAction<string>>;
  setStartCoordinate: Dispatch<SetStateAction<LatLng>>;
  setEndCoordinate: Dispatch<SetStateAction<LatLng>>;
  confirmBooking: () => void;
}

const ChooseLocation: React.FunctionComponent<ChooseLocationProps> = ({
  startLocation,
  endLocation,
  mapView,
  setStartLocation,
  setEndLocation,
  setStartCoordinate,
  setEndCoordinate,
  confirmBooking,
}) => {
  const [currentInput, setCurrentInput] = useState(2);
  const [suggestions, setSuggestions] = useState<GeoCodingResponse[]>([]);

  const suggestionItems = suggestions.map((item: GeoCodingResponse) => (
    <TouchableOpacity
      key={item.formatted_address}
      onPress={() => setInputValue(item)}>
      <Text style={{lineHeight: 24}}>
        <Icon
          name="map-marker-alt"
          type="FontAwesome5"
          style={styles.suggestLocationIcon}
        />
        <Text style={styles.suggestLocationText}>
          {' '}
          {item.formatted_address}
        </Text>
      </Text>
    </TouchableOpacity>
  ));

  async function suggestLocation(value: string, input: number) {
    if (value.length > 5) {
      const data = await geoCoding(encodeURIComponent(value));
      setSuggestions(data);
      setCurrentInput(input);
    }

    if (input === 1) {
      setStartLocation(value);
    } else {
      setEndLocation(value);
    }
  }

  function setInputValue(item: GeoCodingResponse) {
    const latitude = item.geometry.location.lat;
    const longitude = item.geometry.location.lng;

    if (currentInput === 1) {
      setStartLocation(item.formatted_address);
      setStartCoordinate({latitude, longitude});
    } else {
      setEndLocation(item.formatted_address);
      setEndCoordinate({latitude, longitude});
    }

    setSuggestions([]);
    Keyboard.dismiss();

    // Move camera to selected region
    const target = {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    mapView?.animateToRegion(target, 300);
  }

  function confirm() {
    setSuggestions([]);
    Keyboard.dismiss();
    confirmBooking();
  }

  return (
    <Card>
      <CardItem>
        <Grid>
          <Col style={styles.colLeft}>
            <Icon
              name="dot-circle"
              type="FontAwesome5"
              style={styles.yourLocationIcon}
            />
            <Icon
              name="ellipsis-v"
              type="FontAwesome5"
              style={styles.ellipsisIcon}
            />
            <Icon
              name="map-marker-alt"
              type="FontAwesome5"
              style={styles.goToLocationIcon}
            />
          </Col>

          <Col>
            <Input
              placeholder="Enter your location"
              style={styles.input}
              value={startLocation}
              onChangeText={(value) => suggestLocation(value, 1)}
            />
            <Item />
            <Input
              placeholder="I want to go to ..."
              style={styles.input}
              value={endLocation}
              onChangeText={(value) => suggestLocation(value, 2)}
            />
          </Col>
        </Grid>
      </CardItem>

      {suggestions.length > 0 && <View style={styles.divider} />}

      {suggestions.length > 0 && <CardItem>{suggestionItems}</CardItem>}

      <CardItem>
        <Button
          block
          style={styles.bookingButton}
          onPress={confirm}
          disabled={startLocation === '' || endLocation === ''}>
          <Text>Confirm</Text>
        </Button>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  colLeft: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yourLocationIcon: {
    fontSize: 16,
    color: '#3498db',
  },
  ellipsisIcon: {
    fontSize: 16,
    color: '#bdc3c7',
    marginLeft: 8,
    marginTop: 7,
    marginBottom: 7,
  },
  goToLocationIcon: {
    fontSize: 18,
    color: '#e74c3c',
  },
  suggestLocationIcon: {
    fontSize: 14,
    color: '#777',
  },
  suggestLocationText: {
    fontSize: 14,
    lineHeight: 30,
    color: '#333',
  },
  input: {
    fontSize: 14,
    borderBottomWidth: 0,
  },
  divider: {
    borderWidth: 3,
    borderColor: '#ddd',
  },
  bookingButton: {
    marginBottom: 5,
    width: '100%',
  },
});

export default ChooseLocation;
