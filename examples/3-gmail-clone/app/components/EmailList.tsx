import React, {FunctionComponent, useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';

import EmailListItem from './EmailListItem';

const EmailList: FunctionComponent = ({store, category}) => {
  const {emails, getEmails} = store;

  useEffect(() => {
    getEmails(category);
  }, []);

  return (
    <SwipeListView
      data={emails}
      renderItem={(data) => (
        <EmailListItem item={data.item} category={category} />
      )}
      renderHiddenItem={(data) => (
        <View style={styles.swipeListHiddenItem}>
          <View style={styles.swipeListHiddenIconWrapper}>
            <Icon name="archive" style={styles.swipeListHiddenIcon} />
          </View>
          <View style={styles.swipeListHiddenIconWrapper}>
            <Icon name="archive" style={styles.swipeListHiddenIcon} />
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id?.toString()}
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

export default inject('store')(observer(EmailList));
