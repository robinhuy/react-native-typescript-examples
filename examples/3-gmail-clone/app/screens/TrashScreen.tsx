import React, {FunctionComponent, useCallback} from 'react';
import {inject, observer} from 'mobx-react';
import {useFocusEffect} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {Container} from 'native-base';

import HeaderComponent from '../components/HeaderComponent';
import Toolbar from '../components/Toolbar';
import EmailList from '../components/EmailList';

const TrashScreen: FunctionComponent = ({store}) => {
  const {isShowToolbar, getEmails} = store;

  useFocusEffect(
    useCallback(() => {
      getEmails('trashEmails');
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

const styles = StyleSheet.create({});

export default inject('store')(observer(TrashScreen));
