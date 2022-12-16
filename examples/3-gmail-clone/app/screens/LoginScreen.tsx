import {Box, Button, Heading, HStack, Text, VStack} from 'native-base';
import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import LoginForm from './login/LoginForm';

const LoginScreen: FC = () => {
  return (
    <VStack justifyContent="space-between" height="100%">
      <Box>
        <HStack justifyContent="center" alignItems="center" bg="white" w="100%" h={60}>
          <Heading size="md">Sign in</Heading>
        </HStack>

        <HStack justifyContent="space-between" w="100%" paddingX={3} paddingY={4}>
          <Image style={styles.logo} source={require('./login/google-logo.png')} />

          <Box justifyContent="center">
            <Button colorScheme="secondary" size="xs" w={100}>
              <Text color="#fff">Sign up</Text>
            </Button>
          </Box>
        </HStack>

        <Box paddingX={3}>
          <Box style={styles.separator} />

          <LoginForm />

          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Can't access your account?</Text>
          </TouchableOpacity>
        </Box>
      </Box>

      <VStack w="100%" bgColor="#f0f0f0">
        <Box style={styles.separator} />

        <Box alignItems="center" paddingBottom={15}>
          <Text color="#696969">© 2023 Google</Text>
        </Box>
      </VStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 57,
  },
  forgotPasswordText: {
    color: '#658fd9',
    marginTop: 15,
  },
  separator: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
});

export default LoginScreen;
