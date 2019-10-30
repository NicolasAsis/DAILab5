/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Main from './comps/Main';

function App(){
    console.log("App");
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Main />
        </View>
    );
}

export default App;
