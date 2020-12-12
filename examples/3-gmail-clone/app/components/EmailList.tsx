import React, {FunctionComponent, useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'native-base';
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
  const {emails, getEmails} = store;

  useEffect(() => {
    getEmails(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SwipeListView
      data={emails}
      renderItem={(data) => (
        <EmailListItem item={data.item} category={category} />
      )}
      renderHiddenItem={() => (
        <View style={styles.swipeListHiddenItem}>
          <View style={styles.swipeListHiddenIconWrapper}>
            <Icon name="archive" style={styles.swipeListHiddenIcon} />
          </View>
          <View style={styles.swipeListHiddenIconWrapper}>
            <Icon name="archive" style={styles.swipeListHiddenIcon} />
          </View>
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
