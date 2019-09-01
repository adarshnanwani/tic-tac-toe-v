import React from 'react';
import {Dimensions} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Game from '../src/screens/Game';
import About from '../src/screens/About';

const WIDTH = Dimensions.get('window').width;

const routeConfig = {
  Home: {
    screen: Game,
  },
  About: {
    screen: About,
  },
};

const drawerConfig = {
  drawerWIDTH: WIDTH * 0.83,
};
const drawerNavigator = createDrawerNavigator(routeConfig, drawerConfig);

export default createAppContainer(drawerNavigator);