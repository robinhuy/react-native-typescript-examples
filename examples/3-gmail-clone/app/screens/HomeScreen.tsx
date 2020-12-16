import React, {FunctionComponent, useCallback, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Container} from 'native-base';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../models/Store';
import ScreenHeader from '../components/ScreenHeader';
import Toolbar from '../components/Toolbar';
import EmailList from '../components/EmailList';

const HomeScreen: FunctionComponent = () => {
  const store = useContext(StoreContext);
  const {isShowToolbar, getEmails} = store;

  // https://reactnavigation.org/docs/use-focus-effect/
  useFocusEffect(
    useCallback(() => {
      getEmails('emails');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <Container>
      {isShowToolbar ? (
        <Toolbar category="emails" />
      ) : (
        <ScreenHeader hasMenuButton title="Inbox" />
      )}

      <EmailList category="emails" />
    </Container>
  );
};

export default observer(HomeScreen);
