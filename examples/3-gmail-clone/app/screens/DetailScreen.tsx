import {observer} from 'mobx-react-lite';
import {Box} from 'native-base';
import React, {FC, useContext} from 'react';
import {WebView} from 'react-native-webview';
import ScreenHeader from '../components/ScreenHeader';
import {StoreContext} from '../models/Store';

const DetailScreen: FC = () => {
  const store = useContext(StoreContext);
  const {emailContent} = store;

  const headTag = `
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>`;
  const htmlContent = `<html>${headTag}<body>${emailContent}</body></html>`;

  return (
    <Box flex={1}>
      <ScreenHeader title="" />

      <WebView source={{html: htmlContent}} />
    </Box>
  );
};

export default observer(DetailScreen);
