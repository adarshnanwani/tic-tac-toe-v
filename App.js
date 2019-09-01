/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import DrawerNavigator from './navigation/DrawerNavigator';

const App = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <DrawerNavigator />
    </View>
  );
};

export default App;
