import 'react-native-gesture-handler';
import React, {FC, useContext} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {StoreContext} from './models/Store';
import {observer} from 'mobx-react-lite';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import TrashScreen from './screens/TrashScreen';
import LoginScreen from './screens/login/LoginScreen';
import SplashScreen from './screens/SplashScreen';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#002984',
  },
};

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
    </HomeStack.Navigator>
  );
}

const TrashStack = createStackNavigator();
function TrashStackScreen() {
  return (
    <TrashStack.Navigator screenOptions={{headerShown: false}}>
      <TrashStack.Screen name="Trash" component={TrashScreen} />
      <TrashStack.Screen name="Detail" component={DetailScreen} />
    </TrashStack.Navigator>
  );
}

const HomeDrawer = createDrawerNavigator();
function HomeDrawerScreen() {
  return (
    <HomeDrawer.Navigator>
      <HomeDrawer.Screen name="Inbox" component={HomeStackScreen} />
      <HomeDrawer.Screen name="Trash" component={TrashStackScreen} />
    </HomeDrawer.Navigator>
  );
}

const MainStack = createStackNavigator();

const Navigation: FC = () => {
  const store = useContext(StoreContext);

  if (store.isCheckingLoggedIn) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <MainStack.Navigator screenOptions={{headerShown: false}}>
        {store.isLoginSuccess === true ? (
          <MainStack.Screen name="Main" component={HomeDrawerScreen} />
        ) : (
          <MainStack.Screen name="Login" component={LoginScreen} />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default observer(Navigation);
