import React, {FC} from 'react';
import Store, {StoreContext} from './models/Store';
import {NativeBaseProvider} from 'native-base';
import Navigation from './Navigation';

const App: FC = () => {
  return (
    <StoreContext.Provider value={new Store()}>
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    </StoreContext.Provider>
  );
};

export default App;
