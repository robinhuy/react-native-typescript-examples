import React, {FunctionComponent} from 'react';
import {inject, observer} from 'mobx-react';
import {StyleSheet} from 'react-native';
import {Container} from 'native-base';
import {WebView} from 'react-native-webview';

import HeaderComponent from '../components/HeaderComponent';

const DetailScreen: FunctionComponent = ({store}) => {
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
      <HeaderComponent title="" />

      <WebView source={{html: htmlContent}} />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default inject('store')(observer(DetailScreen));
