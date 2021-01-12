import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: FC<ProgressBarProps> = ({progress}) => {
  return (
    <View style={styles.progressBarWrapper}>
      <View style={[styles.progressBar, {width: progress + '%'}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarWrapper: {
    width: '100%',
    height: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  progressBar: {
    height: 16,
    backgroundColor: '#00c985',
    width: 80,
  },
});

export default ProgressBar;
