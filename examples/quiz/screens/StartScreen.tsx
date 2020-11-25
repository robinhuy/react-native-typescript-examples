import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';

interface StartScreenProps {
  startGame: () => void;
}

const StartScreen: React.FunctionComponent<StartScreenProps> = ({
  startGame,
}) => {
  return (
    <View style={styles.body}>
      <View style={styles.heading}>
        <Text style={styles.title}>Funny Quiz</Text>
      </View>

      <View>
        <TouchableHighlight style={styles.startButton} onPress={startGame}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
  },
  heading: {
    marginBottom: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  startButton: {
    backgroundColor: '#8854c0',
    borderRadius: 8,
    minWidth: 150,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default StartScreen;
