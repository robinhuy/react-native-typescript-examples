import React, {FunctionComponent, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {StyleSheet, View} from 'react-native';
import {Input, Item, Button, Text} from 'native-base';

import {useNavigation} from '@react-navigation/native';

const LoginForm: FunctionComponent = ({store}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {login, isLoginSuccess} = store;
  const navigation = useNavigation();

  if (isLoginSuccess === true) {
    navigation.navigate('Main');
  }

  return (
    <View>
      <Text style={styles.title}>Sign In</Text>

      {isLoginSuccess === false && (
        <Text style={styles.errorMsg}>Invalid username or password</Text>
      )}

      <Item regular style={styles.item}>
        <Input
          placeholder="Username"
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
        />
      </Item>

      <Item regular style={styles.item}>
        <Input
          textContentType="password"
          secureTextEntry={true}
          placeholder="Password"
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
        />
      </Item>

      <Button
        block
        primary
        style={{width: 150}}
        onPress={() => login(username, password)}>
        <Text>Sign In</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 15,
    marginLeft: 3,
  },
  errorMsg: {
    fontSize: 16,
    marginBottom: 15,
    marginLeft: 3,
    fontStyle: 'italic',
    color: 'red',
  },
  item: {
    marginBottom: 15,
    padding: 0,
    height: 40,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 16,
  },
});

export default inject('store')(observer(LoginForm));
