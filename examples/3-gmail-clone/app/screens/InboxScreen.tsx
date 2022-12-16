import {useFocusEffect} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {Box} from 'native-base';
import React, {FC, useCallback, useContext} from 'react';
import EmailList from '../components/EmailList';
import ScreenHeader from '../components/ScreenHeader';
import Toolbar from '../components/Toolbar';
import {StoreContext} from '../models/Store';

const HomeScreen: FC = () => {
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
    <Box bgColor="#fff" flex={1}>
      {isShowToolbar ? <Toolbar category="emails" /> : <ScreenHeader hasMenuButton title="Inbox" />}

      <EmailList category="emails" />
    </Box>
  );
};

export default observer(HomeScreen);
