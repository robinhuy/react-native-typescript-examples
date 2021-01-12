import React, {FC} from 'react';
import Store, {StoreContext} from './models/Store';
import Navigation from './Navigation';

const App: FC = () => {
  return (
    <StoreContext.Provider value={new Store()}>
      <Navigation />
    </StoreContext.Provider>
  );
};

export default App;
