import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {Box, Checkbox, HStack, Icon, Text} from 'native-base';
import React, {FC, useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {Email} from '../models/models';
import {StoreContext} from '../models/Store';

interface EmailListItemProps {
  item: Email;
  category: string;
}

const EmailListItem: FC<EmailListItemProps> = ({item, category}) => {
  const navigation = useNavigation();
  const store = useContext(StoreContext);
  const {checkedEmailIds, checkEmail, toggleStar, setEmailContent} = store;
  const isChecked = checkedEmailIds.includes(item.id);

  const goToDetailScreen = () => {
    setEmailContent(item.content);
    navigation.navigate('Detail');
  };

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      paddingX={5}
      paddingY={3}
      bgColor="#fff"
      borderColor="#eee"
      borderBottomWidth={1}>
      <Box w={8}>
        <Checkbox
          accessibilityLabel={isChecked ? 'Checked' : 'Check'}
          isChecked={isChecked}
          value=""
          onChange={() => checkEmail(item.id)}
        />
      </Box>

      <Box flex={1} paddingRight={4}>
        <TouchableOpacity onPress={goToDetailScreen}>
          <Text mb={1} bold>
            {item.sender}
          </Text>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      </Box>

      <Box alignItems="center">
        <Text>{item.time}</Text>
        <Icon
          name={item.isStarred ? 'star' : 'star-outline'}
          as={Ionicons}
          size={22}
          color={item.isStarred ? '#ffd153' : '#e2e2e2'}
          onPress={() => toggleStar(category, item.id)}
        />
      </Box>
    </HStack>
  );
};

export default observer(EmailListItem);
