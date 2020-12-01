import Main from './src';
import React from "react";
import { store } from './src/store/configureStore';
import { Provider } from 'react-redux';

export default function App() {
  console.log('=====================App is Start=====================')
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
