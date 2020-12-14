import React, {FunctionComponent, useContext} from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {ListItem, Left, Body, Right, CheckBox, Text, Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../models/Store';
import {Email} from '../models/models';

interface EmailListItemProps {
  item: Email;
  category: string;
}

const EmailListItem: FunctionComponent<EmailListItemProps> = ({
  item,
  category,
}) => {
  const navigation = useNavigation();
  const store = useContext(StoreContext);
  const {checkedEmailIds, checkEmail, toggleStar, setEmailContent} = store;

  function goToDetailScreen() {
    setEmailContent(item.content);
    navigation.navigate('Detail');
  }

  return (
    <ListItem noIndent style={{backgroundColor: '#fff'}}>
      <Left style={styles.left}>
        <CheckBox
          checked={checkedEmailIds.includes(item.id)}
          onPress={() => checkEmail(item.id)}
          style={
            Platform.OS === 'android'
              ? styles.checkBoxAndroid
              : styles.checkBoxIos
          }
        />
      </Left>

      <Body style={styles.body}>
        <TouchableOpacity onPress={goToDetailScreen}>
          <Text style={{marginBottom: 5}}>{item.sender}</Text>
          <Text note>{item.title}</Text>
        </TouchableOpacity>
      </Body>

      <Right style={styles.right}>
        <Text note>{item.time}</Text>
        <Icon
          name={item.isStarred ? 'star' : 'star-outline'}
          style={[
            styles.starIcon,
            {color: item.isStarred ? '#ffd153' : '#e2e2e2'},
          ]}
          onPress={() => toggleStar(category, item.id)}
        />
      </Right>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  left: {
    flex: 1,
  },
  body: {
    flex: 10,
  },
  right: {
    flex: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkBoxAndroid: {
    left: 2,
    paddingLeft: 0,
  },
  checkBoxIos: {
    left: -10,
    width: 38,
    height: 38,
    borderRadius: 38,
    paddingLeft: 5,
    paddingTop: 10,
    transform: [{scale: 0.6}],
  },
  starIcon: {
    fontSize: 26,
    marginTop: 4,
  },
});

export default observer(EmailListItem);
