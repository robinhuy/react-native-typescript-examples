import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {Card, CardItem, Col, Grid, Icon, Input, Item} from 'native-base';

interface ChooseLocationProps {
  startLocation: string;
  endLocation: string;
  setStartLocation: Dispatch<SetStateAction<string>>;
  setEndLocation: Dispatch<SetStateAction<string>>;
}

const ChooseLocation: React.FunctionComponent<ChooseLocationProps> = ({
  startLocation,
  endLocation,
  setStartLocation,
  setEndLocation,
}) => {
  function check() {
    
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
              onChangeText={setStartLocation}
              onBlur={check}
            />
            <Item />
            <Input
              placeholder="I want to go to ..."
              style={styles.input}
              value={endLocation}
              onChangeText={setEndLocation}
              onBlur={check}
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
