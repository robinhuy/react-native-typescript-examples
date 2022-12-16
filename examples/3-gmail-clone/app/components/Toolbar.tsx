import {observer} from 'mobx-react-lite';
import {Box, Button, Icon, Text} from 'native-base';
import React, {FC, useContext} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {StoreContext} from '../models/Store';

interface ToolbarProps {
  category: string;
}

const Toolbar: FC<ToolbarProps> = ({category}) => {
  const store = useContext(StoreContext);
  const {setShowToolbar, checkedEmailIds, setCheckedEmailIds, moveSelectedEmails} = store;

  const hideToolbar = () => {
    setShowToolbar(false);
    setCheckedEmailIds([]);
  };

  return (
    <Box>
      <Button variant="unstyled" onPress={hideToolbar}>
        <Icon name="arrow-back" />
      </Button>

      <Text style={styles.countText}>{checkedEmailIds.length}</Text>

      {category === 'emails' ? (
        <Button variant="unstyled" onPress={() => moveSelectedEmails('emails', 'trashEmails')}>
          <Icon name="trash" />
        </Button>
      ) : (
        <Button variant="unstyled" onPress={() => moveSelectedEmails('trashEmails', 'emails')}>
          <Icon name="mail" />
        </Button>
      )}
    </Box>
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
