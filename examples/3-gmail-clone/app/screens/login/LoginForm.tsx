import React, {FC, useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Item, Button, Text} from 'native-base';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../../models/Store';

const LoginForm: FC = () => {
  const store = useContext(StoreContext);
  const {login, isLoginSuccess} = store;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <Text style={styles.title}>Sign In</Text>

      {isLoginSuccess === false && (
        <Text style={styles.errorMsg}>Invalid email or password</Text>
      )}

      <Item regular style={styles.item}>
        <Input
          placeholder="Email"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </Item>

      <Item regular style={styles.item}>
        <Input
          textContentType="password"
          secureTextEntry={true}
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </Item>

      <Button
        block
        primary
        style={{width: 150}}
        onPress={() => login(email, password)}>
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

export default observer(LoginForm);
