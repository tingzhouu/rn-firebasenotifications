import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  AsyncStorage,
} from 'react-native';

import firebase from 'react-native-firebase';

// eslint-disable-next-line no-undef
if (__DEV__) {
  import('./reactotronconfig');
}

class App extends Component {
  async componentDidMount() {
    await this.checkPermission();
    await this.createNotificationListeners();
  }

  // componentWillUnmount() {
  //   this.notificationListener();
  //   this.notificationOpenedListener();
  // }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('fcmToken', fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    console.log('notificationListeners created start');
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      console.log('hello this is a notificationlistener');
      const { title, body } = notification;
      this.showAlert(title, body);
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      console.log('hello this is a notificationlistener2');
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      console.log('hello this is a notificationlistener3');
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
    // process data message
    console.log('hello this is a notificationlistener4');
    console.log(JSON.stringify(message));
    });

    console.log('notificationListeners created end');
  }
  
  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

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
