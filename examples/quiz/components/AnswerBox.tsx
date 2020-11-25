import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';

interface Answer {
  key: string;
  content: string;
}

interface AnswerBoxProps {
  answers: Answer[];
  checkAnswer: (userAnswer: string) => void;
}

const AnswerBox: React.FunctionComponent<AnswerBoxProps> = ({
  answers,
  checkAnswer,
}) => {
  let answerContent = [];

  for (let i = 0; i < answers.length; i++) {
    const key = answers[i].key;

    answerContent.push(
      <TouchableHighlight
        key={key}
        onPress={() => checkAnswer(key)}
        style={styles.answerButtonWrapper}>
        <View style={[styles.answerButton, styles['answerButton' + key]]}>
          <Text style={styles.answerText}>{answers[i].content}</Text>
        </View>
      </TouchableHighlight>,
    );
  }

  return <View>{answerContent}</View>;
};

const styles = StyleSheet.create({
  answerButtonWrapper: {
    height: 50,
    marginTop: 5,
  },
  answerButton: {
    height: '100%',
    justifyContent: 'center',
    borderColor: '#ffffff',
  },
  answerButtonA: {
    backgroundColor: '#2c70ad',
  },
  answerButtonB: {
    backgroundColor: '#3d9ea6',
  },
  answerButtonC: {
    backgroundColor: '#eea928',
  },
  answerButtonD: {
    backgroundColor: '#d4546c',
  },
  answerText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default AnswerBox;
