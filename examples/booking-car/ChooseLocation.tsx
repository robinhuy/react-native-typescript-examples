import React, {useState} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {Card, CardItem, Col, Grid, Icon, Input, Item} from 'native-base';

interface ChooseLocationProps {
  startLocation: any;
  setStartLocation: any;
}

const ChooseLocation: React.FunctionComponent<ChooseLocationProps> = ({
  startLocation,
  setStartLocation,
}) => {
  const [endLocation, setEndLocation] = useState('');

  function check() {
    if (endLocation) {
      Alert.alert('ok');
    }
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

          <Col style={styles.colRight}>
            <Input
              placeholder="Enter your location"
              style={styles.input}
              value={startLocation}
              onChangeText={(value) => setStartLocation(value)}
              onBlur={() => check()}
            />
            <Item />
            <Input
              placeholder="I want to go to ..."
              style={styles.input}
              onChangeText={(value) => setEndLocation(value)}
              onBlur={() => check()}
            />
          </Col>
        </Grid>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  colLeft: {
    width: 40,
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
  colRight: {},
  input: {
    fontSize: 14,
    borderBottomWidth: 0,
  },
});

export default ChooseLocation;
