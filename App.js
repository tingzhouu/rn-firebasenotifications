import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import firebase from 'react-native-firebase';

// eslint-disable-next-line no-undef
if (__DEV__) {
  import('./reactotronconfig');
}

class App extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Push notifications</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
