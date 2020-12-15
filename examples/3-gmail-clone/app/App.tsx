import React, {FunctionComponent} from 'react';
import Store, {StoreContext} from './models/Store';
import Navigation from './Navigation';

const App: FunctionComponent = () => {
  return (
    <StoreContext.Provider value={new Store()}>
      <Navigation />
    </StoreContext.Provider>
  );
};

export default App;
