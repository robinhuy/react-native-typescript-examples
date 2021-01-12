import React, {FC, useCallback, useContext} from 'react';
import {Container} from 'native-base';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../models/Store';
import {useFocusEffect} from '@react-navigation/native';
import HeaderComponent from '../components/ScreenHeader';
import Toolbar from '../components/Toolbar';
import EmailList from '../components/EmailList';

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
    <Container>
      {isShowToolbar ? (
        <Toolbar category="trashEmails" />
      ) : (
        <HeaderComponent hasMenuButton title="Trash" />
      )}

      <EmailList category="trashEmails" />
    </Container>
  );
};

export default observer(TrashScreen);
