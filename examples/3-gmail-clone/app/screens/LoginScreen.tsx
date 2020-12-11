import React, {FunctionComponent} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Alert} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  Left,
  Body,
  Right,
  Title,
  Button,
  Text,
} from 'native-base';

import LoginForm from '../components/LoginForm';

const LoginScreen: FunctionComponent = () => {
  return (
    <Container>
      <Header>
        <Left style={{flex: 1}} />
        <Body style={{alignItems: 'center'}}>
          <Title>Sign in</Title>
        </Body>
        <Right />
      </Header>

      <Content style={{backgroundColor: '#f0f0f0', padding: 10}}>
        <View style={styles.headerSection}>
          <Image
            style={styles.logo}
            source={require('../img/google-logo.png')}
          />

          <Button block danger style={{width: 100}}>
            <Text>Sign up</Text>
          </Button>
        </View>

        <View style={styles.separator} />

        <LoginForm />

        <TouchableOpacity onPress={() => Alert.alert('Building ...')}>
          <Text style={{color: '#658fd9', marginTop: 15}}>
            Can't access your account?
          </Text>
        </TouchableOpacity>
      </Content>

      <Footer style={{backgroundColor: '#f0f0f0'}}>
        <Left />
        <Body>
          <Text style={{color: '#696969'}}>© 2020 Google</Text>
        </Body>
        <Right />
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 15,
  },
  logo: {
    width: 150,
    height: 57,
  },
  separator: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
});

export default LoginScreen;
