import 'react-native-gesture-handler';
import React, {FunctionComponent, useContext} from 'react';
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
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Detail"
        component={DetailScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}

const TrashStack = createStackNavigator();
function TrashStackScreen() {
  return (
    <TrashStack.Navigator>
      <TrashStack.Screen
        name="Trash"
        component={TrashScreen}
        options={{headerShown: false}}
      />
      <TrashStack.Screen
        name="Detail"
        component={DetailScreen}
        options={{headerShown: false}}
      />
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

const Navigation: FunctionComponent = () => {
  const store = useContext(StoreContext);

  if (store.isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <MainStack.Navigator>
        {store.isLoginSuccess === null ? (
          <MainStack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        ) : (
          <MainStack.Screen
            name="Main"
            component={HomeDrawerScreen}
            options={{headerShown: false}}
          />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default observer(Navigation);
