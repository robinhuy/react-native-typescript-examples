import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {HStack, Heading, Button, Icon, Image, Box} from 'native-base';
import React, {FC, useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {StoreContext} from '../models/Store';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

interface ScreenHeaderProps {
  hasMenuButton?: boolean;
  title: string;
}
const ScreenHeader: FC<ScreenHeaderProps> = ({hasMenuButton = false, title = ''}) => {
  const navigation = useNavigation();
  const store = useContext(StoreContext);
  const {avatar, logout} = store;

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      bgColor="#f5f6f7"
      borderColor="#ddd"
      borderBottomWidth={1}>
      {hasMenuButton ? (
        <Button variant="ghost" onPress={navigation.toggleDrawer}>
          <Icon name="menu" as={Ionicons} size={10} />
        </Button>
      ) : (
        <Button variant="ghost" onPress={navigation.goBack}>
          <Icon name="arrow-back" as={Ionicons} size={8} />
        </Button>
      )}

      <Heading size="md">{title}</Heading>

      <Box mr={5}>
        <TouchableOpacity onPress={logout}>
          <Image size={10} borderRadius={20} source={{uri: avatar}} alt="avatar" />
        </TouchableOpacity>
      </Box>
    </HStack>
  );
};

export default observer(ScreenHeader);
