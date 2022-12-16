# React Native Typescript examples

Learn React Native (version 0.70 with Typescript) by easy-to-difficult examples.

_For more basic examples, see [React Native Expo examples](https://github.com/robinhuy/react-native-expo-examples)_

## Run project in development

- Setting up the development environment: https://reactnative.dev/docs/environment-setup.

- Install dependencies: `yarn` (or `npm install`). On iOS run: `npx pod-install`.

- Run on Android: `yarn android` (or `npm run android`).

- Run on iOS: `yarn ios` (or `npm run ios`).

## Change example

Modify code in `App.tsx`, each example is an application.

## Preview

### 1. Quiz Game

Learn how to use: **Type Script static type checking**, **React Hook useEffect + Timer**

<img src="https://user-images.githubusercontent.com/12640832/101762123-9842e080-3b0f-11eb-951a-82fae0c2481b.gif" width="250" alt="Quiz Game" />

### 2. Booking Car

Learn how to use: **Native Base + React Native Vector Icons**, **React Native Maps + React Native Maps Directions**, **Google Map API**, **Keyboard + Keyboard Event**

<img src="https://user-images.githubusercontent.com/12640832/101765164-85320f80-3b13-11eb-8066-a5d4436ebd90.gif" width="250" alt="Booking Car" />

Note: To run this example, you must get & config Google Map API KEY for [Android](https://developers.google.com/maps/documentation/android-sdk/get-api-key) or [iOS](https://developers.google.com/maps/documentation/ios-sdk/get-api-key)

### 3. Gmail clone

Learn how to use: **API Sauce**, **MobX + MobX React Lite**, **React Context**, **React Navigation Authentication flows + useFocusEffect**, **React Native Web View**

<img src="https://user-images.githubusercontent.com/12640832/102325797-2d355600-3fb6-11eb-9975-dd8849782b48.gif" width="250" alt="Gmail clone" />

Note: To run this example, you must start the server ([https://github.com/robinhuy/fake-api-nodejs](https://github.com/robinhuy/fake-api-nodejs)) in folder `server`:

```
  cd server
  yarn
  yarn start
```