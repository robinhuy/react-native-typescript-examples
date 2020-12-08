import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet} from 'react-native';
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

interface ChooseLocationProps {
  startLocation: string;
  endLocation: string;
  setStartLocation: Dispatch<SetStateAction<string>>;
  setEndLocation: Dispatch<SetStateAction<string>>;
  confirmBooking: () => void;
}

const ChooseLocation: React.FunctionComponent<ChooseLocationProps> = ({
  startLocation,
  endLocation,
  setStartLocation,
  setEndLocation,
  confirmBooking,
}) => {
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
            <View style={styles.tempView} />
          </Col>

          <Col>
            <Input
              placeholder="Enter your location"
              style={styles.input}
              value={startLocation}
              onChangeText={setStartLocation}
            />
            <Item />
            <Input
              placeholder="I want to go to ..."
              style={styles.input}
              value={endLocation}
              onChangeText={setEndLocation}
            />
            <Button
              block
              style={styles.bookingButton}
              onPress={confirmBooking}
              disabled={startLocation === '' || endLocation === ''}>
              <Text>Confirm</Text>
            </Button>
          </Col>
        </Grid>
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
  tempView: {
    height: 53,
  },
  input: {
    fontSize: 14,
    borderBottomWidth: 0,
  },
  bookingButton: {
    marginTop: 10,
  },
});

export default ChooseLocation;
