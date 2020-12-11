import React, {FunctionComponent, useCallback} from 'react';
import {inject, observer} from 'mobx-react';
import {useFocusEffect} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {Container} from 'native-base';

import HeaderComponent from '../components/HeaderComponent';
import Toolbar from '../components/Toolbar';
import EmailList from '../components/EmailList';

const HomeScreen: FunctionComponent = ({store}) => {
  const {isShowToolbar, getEmails} = store;

  useFocusEffect(
    useCallback(() => {
      getEmails('emails');
    }, []),
  );

  return (
    <Container>
      {isShowToolbar ? (
        <Toolbar category="emails" />
      ) : (
        <HeaderComponent hasMenuButton title="Inbox" />
      )}

      <EmailList category="emails" />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default inject('store')(observer(HomeScreen));
