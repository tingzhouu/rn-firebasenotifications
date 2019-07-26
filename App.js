import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

import firebase from 'react-native-firebase';

// eslint-disable-next-line no-undef
if (__DEV__) {
  import('./reactotronconfig');
}

class App extends Component {
  componentDidMount() {
    // Build a channel
    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');
    // Create the channel
    firebase.notifications().android.createChannel(channel);
    console.log('channel created');

    this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    this.removeNotificationListener = firebase.notifications().onNotification((notification) => {
      // Process your notification as required
      console.log('hey we got a notification');
      const newNotification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
      })
        .setNotificationId('notificationId')
        .setTitle('My notification title')
        .setBody('My notification body')
        .android.setChannelId('test-channel')
        .android.setSmallIcon('ic_launcher');

      firebase.notifications().displayNotification(newNotification);
    });
  }

  componentWillUnmount() {
    this.removeNotificationDisplayedListener();
    this.removeNotificationListener();
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
