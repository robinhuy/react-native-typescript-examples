import React, {FunctionComponent} from 'react';
import {StyleSheet, View, Text, TouchableHighlight, Modal} from 'react-native';

interface ResultModalProps {
  isVisible: boolean;
  restartGame: () => void;
  score: number;
  numberQuestions: number;
}

const ResultModal: FunctionComponent<ResultModalProps> = ({
  isVisible,
  restartGame,
  score,
  numberQuestions,
}) => {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.dialog}>
          <Text style={styles.dialogText}>
            Bạn trả lời đúng {score}/{numberQuestions} câu{' '}
          </Text>

          <TouchableHighlight
            style={[styles.button, styles.buttonPrimary]}
            onPress={() => restartGame()}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dialog: {
    height: '100%',
    padding: 15,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  dialogText: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    justifyContent: 'center',
    margin: 5,
    padding: 10,
  },
  buttonPrimary: {
    backgroundColor: '#8854c0',
  },
  buttonText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#ffffff',
  },
});

export default ResultModal;
