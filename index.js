/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import Product from './Product'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Product);
