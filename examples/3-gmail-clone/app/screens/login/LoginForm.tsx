import {observer} from 'mobx-react-lite';
import {Box, Button, Input, Heading, Text} from 'native-base';
import React, {FC, useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {StoreContext} from '../../models/Store';

const LoginForm: FC = () => {
  const store = useContext(StoreContext);
  const {login, isLoginSuccess} = store;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box w="100%">
      <Heading mb={15}>Sign In</Heading>

      {isLoginSuccess === false && <Text style={styles.errorMsg}>Invalid email or password</Text>}

      <Box style={styles.item}>
        <Input
          placeholder="Email"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </Box>

      <Box style={styles.item}>
        <Input
          textContentType="password"
          secureTextEntry={true}
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </Box>

      <Button w="150" onPress={() => login(email, password)}>
        <Text color="#ffffff">Sign In</Text>
      </Button>
    </Box>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 16,
  },
});

export default observer(LoginForm);
