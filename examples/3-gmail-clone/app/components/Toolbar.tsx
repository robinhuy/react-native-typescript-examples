import React, {FunctionComponent} from 'react';
import {inject, observer} from 'mobx-react';
import {StyleSheet, Platform} from 'react-native';
import {Header, Left, Body, Right, Icon, Button, Text} from 'native-base';

const Toolbar: FunctionComponent = ({store, category}) => {
  const {
    setShowToolbar,
    checkedEmails,
    setCheckedEmails,
    moveSelectedEmails,
  } = store;

  function hideToolbar() {
    setShowToolbar(false);
    setCheckedEmails([]);
  }

  return (
    <Header>
      <Left>
        <Button transparent onPress={hideToolbar}>
          <Icon name="arrow-back" />
        </Button>
      </Left>

      <Body>
        <Text style={{color: Platform.OS === 'ios' ? '#000' : '#fff'}}>
          {checkedEmails.length}
        </Text>
      </Body>

      <Right>
        {category === 'emails' ? (
          <Button
            transparent
            onPress={() => moveSelectedEmails('emails', 'trashEmails')}>
            <Icon name="trash" />
          </Button>
        ) : (
          <Button
            transparent
            onPress={() => moveSelectedEmails('trashEmails', 'emails')}>
            <Icon name="mail" />
          </Button>
        )}
      </Right>
    </Header>
  );
};

const styles = StyleSheet.create({});

export default inject('store')(observer(Toolbar));
