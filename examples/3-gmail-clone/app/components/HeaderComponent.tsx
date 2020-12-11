import React, {FunctionComponent} from 'react';
import {inject, observer} from 'mobx-react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Header,
  Title,
  Left,
  Body,
  Right,
  Icon,
  Button,
  Thumbnail,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const HeaderComponent: FunctionComponent = ({
  store,
  hasMenuButton = false,
  title = '',
}) => {
  const navigation = useNavigation();
  const {isLoginSuccess, avatar, logout} = store;

  if (isLoginSuccess !== true) {
    navigation.navigate('Login');
  }

  return (
    <Header>
      <Left>
        {hasMenuButton ? (
          <Button transparent onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" />
          </Button>
        ) : (
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        )}
      </Left>

      <Body>
        <Title>{title}</Title>
      </Body>

      <Right>
        <TouchableOpacity onPress={() => logout()}>
          <Thumbnail small source={{uri: avatar}} />
        </TouchableOpacity>
      </Right>
    </Header>
  );
};

const styles = StyleSheet.create({});

export default inject('store')(observer(HeaderComponent));
