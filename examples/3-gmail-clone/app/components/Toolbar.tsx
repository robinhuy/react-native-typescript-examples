import React, {FunctionComponent, useContext} from 'react';
import {Platform} from 'react-native';
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

export default observer(Toolbar);
