'use strict';

var React = require('react-native');
var Styles = require('./styles.js');
var {
  StyleSheet,
  View,
  Text,
  Image
} = React;

var GithubView = React.createClass({
  getInitialState: function () {
    return {notifications: 0};
  },
  render: function () {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>3 Work Notifications</Text>
          <Image source={require('image!github')} style={styles.image} />
        </View>
        <View style={styles.row}>
          <Text style={styles.notification}>robin-dashboard#2306 Feature - Shareable Models</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.notification}>robin-dashboard#2298 Chore - Angular 1.4.4</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.notification}>robinpowered/robin-dashboard#2319  Bugfix - Set Access Token</Text>
        </View>
      </View>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  image: {
    height: 40,
    width: 40
  },
  title: {
    marginRight: 15,
    color: '#fff',
    fontSize: 36
  },
  text: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'right'
  },
  notification: {
    color: '#fff',
    fontSize: Styles.fontSize.small
  }
});

module.exports = GithubView;
