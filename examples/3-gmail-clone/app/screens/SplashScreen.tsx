import React, {FunctionComponent} from 'react';
import {Spinner, View} from 'native-base';

const SplashScreen: FunctionComponent = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Spinner />
    </View>
  );
};

export default SplashScreen;
