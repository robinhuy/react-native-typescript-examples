import {observer} from 'mobx-react-lite';
import {Box, HStack, Icon, Spinner, Text} from 'native-base';
import React, {FC, useContext} from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {Email} from '../models/models';
import {StoreContext} from '../models/Store';
import EmailListItem from './EmailListItem';

interface EmailListProps {
  category: string;
}

const EmailList: FC<EmailListProps> = ({category}) => {
  const store = useContext(StoreContext);
  const {isLoading, emails} = store;

  const archiveEmail = () => {
    Alert.alert('Email was archived successfully!');
  };

  if (isLoading) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Spinner />
      </Box>
    );
  }

  if (emails.length === 0) {
    return (
      <Box padding={15}>
        <Text>No email in the box!</Text>
      </Box>
    );
  }

  return (
    <SwipeListView
      data={store.emails}
      renderItem={data => <EmailListItem item={data.item} category={category} />}
      renderHiddenItem={() => (
        <HStack justifyContent="space-between" alignItems="center" h="100%" bgColor="green.500">
          <TouchableOpacity style={styles.swipeListHiddenIconWrapper} onPress={archiveEmail}>
            <Icon name="archive" color="#fff" size={30} as={Ionicons} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.swipeListHiddenIconWrapper} onPress={archiveEmail}>
            <Icon name="archive" color="#fff" size={30} as={Ionicons} />
          </TouchableOpacity>
        </HStack>
      )}
      keyExtractor={(item: Email) => item.id?.toString()}
      leftOpenValue={75}
      rightOpenValue={-75}
    />
  );
};

const styles = StyleSheet.create({
  swipeListHiddenIconWrapper: {
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeListHiddenIcon: {
    color: '#fff',
    fontSize: 30,
  },
});

export default observer(EmailList);
