import React, {FunctionComponent, useContext} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Header, Left, Body, Right, Icon, Button, Text} from 'native-base';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../models/Store';

interface ToolbarProps {
  category: string;
}

const Toolbar: FunctionComponent<ToolbarProps> = ({category}) => {
  const store = useContext(StoreContext);
  const {
    setShowToolbar,
    checkedEmailIds,
    setCheckedEmailIds,
    moveSelectedEmails,
  } = store;

  function hideToolbar() {
    setShowToolbar(false);
    setCheckedEmailIds([]);
  }

  return (
    <Header>
      <Left>
        <Button transparent onPress={hideToolbar}>
          <Icon name="arrow-back" />
        </Button>
      </Left>

      <Body>
        <Text style={styles.countText}>{checkedEmailIds.length}</Text>
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

const styles = StyleSheet.create({
  countText: {
    color: Platform.OS === 'ios' ? '#000' : '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default observer(Toolbar);
