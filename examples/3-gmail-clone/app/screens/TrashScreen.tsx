import {useFocusEffect} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {Box} from 'native-base';
import React, {FC, useCallback, useContext} from 'react';
import EmailList from '../components/EmailList';
import HeaderComponent from '../components/ScreenHeader';
import Toolbar from '../components/Toolbar';
import {StoreContext} from '../models/Store';

const TrashScreen: FC = () => {
  const store = useContext(StoreContext);
  const {isShowToolbar, getEmails} = store;

  useFocusEffect(
    useCallback(() => {
      getEmails('trashEmails');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <Box>
      {isShowToolbar ? (
        <Toolbar category="trashEmails" />
      ) : (
        <HeaderComponent hasMenuButton title="Trash" />
      )}

      <EmailList category="trashEmails" />
    </Box>
  );
};

export default observer(TrashScreen);
