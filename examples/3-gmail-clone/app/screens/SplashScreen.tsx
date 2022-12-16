import {Box, Spinner} from 'native-base';
import React, {FC} from 'react';

const SplashScreen: FC = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Spinner />
    </Box>
  );
};

export default SplashScreen;
