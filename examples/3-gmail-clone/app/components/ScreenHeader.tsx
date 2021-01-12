import React, {FC, useContext} from 'react';
import {TouchableOpacity} from 'react-native';
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
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../models/Store';

interface ScreenHeaderProps {
  hasMenuButton?: boolean;
  title: string;
}
const ScreenHeader: FC<ScreenHeaderProps> = ({
  hasMenuButton = false,
  title = '',
}) => {
  const navigation = useNavigation();
  const store = useContext(StoreContext);
  const {avatar, logout} = store;

  return (
    <Header>
      <Left>
        {hasMenuButton ? (
          <Button transparent onPress={navigation.toggleDrawer}>
            <Icon name="menu" />
          </Button>
        ) : (
          <Button transparent onPress={navigation.goBack}>
            <Icon name="arrow-back" />
          </Button>
        )}
      </Left>

      <Body>
        <Title>{title}</Title>
      </Body>

      <Right>
        <TouchableOpacity onPress={logout}>
          <Thumbnail small source={{uri: avatar}} />
        </TouchableOpacity>
      </Right>
    </Header>
  );
};

export default observer(ScreenHeader);
