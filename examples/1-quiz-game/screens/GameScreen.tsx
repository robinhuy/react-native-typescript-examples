import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import Header from '../components/Header';
import QuestionBox from '../components/QuestionBox';
import AnswerBox from '../components/AnswerBox';
import ResultModal from '../components/ResultModal';

import {questions} from '../mockdata.json';

const ANSWER_TIME = 10;

const GameScreen: React.FunctionComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(ANSWER_TIME);
  const [isShowResult, setShowResult] = useState(false);

  const question = questions[currentQuestion];

  function checkAnswer(userAnswer: string) {
    if (question.correctAnswer === userAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion === questions.length - 1) {
      setShowResult(true);
      setRemainingTime(0);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setRemainingTime(ANSWER_TIME);
    }
  }

  function restartGame() {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setRemainingTime(ANSWER_TIME);
  }

  useEffect(() => {
    if (remainingTime > 0 && !isShowResult) {
      const timeOut = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);

      return () => {
        clearTimeout(timeOut);
      };
    } else {
      checkAnswer('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTime]);

  const answerTimeProgress = (remainingTime / ANSWER_TIME) * 100;

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Header
          currentQuestion={currentQuestion + 1}
          totalQuestions={questions.length}
          progress={answerTimeProgress}
        />
      </View>

      <View style={styles.questionBox}>
        <QuestionBox questionContent={question.content} />
      </View>

      <View style={styles.answerBox}>
        <AnswerBox answers={question.answers} checkAnswer={checkAnswer} />
      </View>

      <ResultModal
        isVisible={isShowResult}
        score={score}
        numberQuestions={questions.length}
        restartGame={restartGame}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: '#471a45',
  },
  header: {
    height: 40,
    paddingHorizontal: 8,
    backgroundColor: '#262626',
    borderBottomWidth: 2,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    paddingBottom: 0,
  },
  answerBox: {
    height: 230,
    padding: 5,
    paddingTop: 0,
  },
});

export default GameScreen;
