import React, {FunctionComponent, useContext} from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, View, Text} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../models/Store';
import {Email} from '../models/models';
import EmailListItem from './EmailListItem';

interface EmailListProps {
  category: string;
}

const EmailList: FunctionComponent<EmailListProps> = ({category}) => {
  const store = useContext(StoreContext);

  function archiveEmail() {
    Alert.alert('Email was archived successfully!');
  }

  if (store.emails.length === 0) {
    return (
      <View style={{padding: 15}}>
        <Text>No email in the box!</Text>
      </View>
    );
  }

  return (
    <SwipeListView
      data={store.emails}
      renderItem={(data) => (
        <EmailListItem item={data.item} category={category} />
      )}
      renderHiddenItem={() => (
        <View style={styles.swipeListHiddenItem}>
          <TouchableOpacity
            style={styles.swipeListHiddenIconWrapper}
            onPress={archiveEmail}>
            <Icon name="archive" style={styles.swipeListHiddenIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.swipeListHiddenIconWrapper}
            onPress={archiveEmail}>
            <Icon name="archive" style={styles.swipeListHiddenIcon} />
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item: Email) => item.id?.toString()}
      leftOpenValue={75}
      rightOpenValue={-75}
    />
  );
};

const styles = StyleSheet.create({
  swipeListHiddenItem: {
    backgroundColor: 'green',
    height: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
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
