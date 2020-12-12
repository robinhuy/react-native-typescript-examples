import React, {FunctionComponent, useContext} from 'react';
import {Container} from 'native-base';
import {WebView} from 'react-native-webview';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../models/Store';
import ScreenHeader from '../components/ScreenHeader';

const DetailScreen: FunctionComponent = () => {
  const store = useContext(StoreContext);
  const {emailContent} = store;

  const styleTag = `
    <style>
      h1 {
        font-size: 30px;
      }
    </style>`;
  const headTag = `
    <head>

      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      ${styleTag}
    </head>`;
  const htmlContent = `<html>${headTag}<body>${emailContent}</body></html>`;

  return (
    <Container>
      <ScreenHeader title="" />

      <WebView source={{html: htmlContent}} />
    </Container>
  );
};

export default observer(DetailScreen);
