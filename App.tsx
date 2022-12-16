import React from 'react';
import Quiz from './examples/1-quiz-game/App';
import BookingCar from './examples/2-booking-car/App';
import GmailClone from './examples/3-gmail-clone/app/App';

const App: React.FunctionComponent = () => {
  // Comment unwanted examples, return the example you want to display
  return <Quiz />;
  return <BookingCar />;
  return <GmailClone />;
};

export default App;
