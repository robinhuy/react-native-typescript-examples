import {Box, Button, HStack, Icon, Input, Stack, Text, View, VStack} from 'native-base';
import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {Keyboard, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {LatLng} from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
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

const ChooseLocation: FC<ChooseLocationProps> = ({
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
    <TouchableOpacity key={item.formatted_address} onPress={() => setInputValue(item)}>
      <Text style={{lineHeight: 24}}>
        <Icon name="map-marker-alt" as={FontAwesome5} size={14} color="#777" />
        <Text style={styles.suggestLocationText}> {item.formatted_address}</Text>
      </Text>
    </TouchableOpacity>
  ));

  const suggestLocation = async (value: string, input: number) => {
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
  };

  const setInputValue = (item: GeoCodingResponse) => {
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
  };

  const confirm = () => {
    setSuggestions([]);
    Keyboard.dismiss();
    confirmBooking();
  };

  return (
    <Box borderWidth={1} borderColor="#ddd" bgColor="#fff" borderRadius="md" pb={4}>
      <VStack space="4">
        <Box px="4" pt="4">
          <HStack w="100%">
            <Stack direction="column" w={36} alignItems="center" justifyContent="center">
              <Icon name="dot-circle" as={FontAwesome5} size={5} color="#3498db" />

              <Icon
                name="ellipsis-v"
                as={FontAwesome5}
                size={4}
                color="#bdc3c7"
                style={styles.ellipsisIcon}
              />

              <Icon name="map-marker-alt" as={FontAwesome5} size={5} color="#e74c3c" />
            </Stack>

            <Stack direction="column" flex={1}>
              <Input
                placeholder="Enter your location"
                borderWidth={0}
                borderBottomWidth={1}
                style={styles.input}
                value={startLocation}
                onChangeText={value => suggestLocation(value, 1)}
              />

              <Input
                placeholder="I want to go to ..."
                borderWidth={0}
                style={styles.input}
                value={endLocation}
                onChangeText={value => suggestLocation(value, 2)}
              />
            </Stack>
          </HStack>
        </Box>

        {suggestions.length > 0 && <View style={styles.divider} />}

        {suggestions.length > 0 && <Box>{suggestionItems}</Box>}

        <Box px="4">
          <Button
            style={styles.bookingButton}
            onPress={confirm}
            disabled={startLocation === '' || endLocation === ''}>
            <Text color="#fff">Confirm</Text>
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  ellipsisIcon: {
    marginLeft: 7,
    marginTop: 7,
    marginBottom: 7,
  },
  suggestLocationText: {
    fontSize: 14,
    lineHeight: 30,
    color: '#333',
  },
  input: {
    fontSize: 14,
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
