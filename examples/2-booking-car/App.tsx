import React, {FC} from 'react';
import {NativeBaseProvider} from 'native-base';
import Main from './Main';

const App: FC = () => {
  return (
    // https://docs.nativebase.io/install-rn
    <NativeBaseProvider>
      <Main />
    </NativeBaseProvider>
  );
};

export default App;
