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
          <Image source={require('image!github')} style={styles.image} />
          <Text style={styles.title}>3 Work Notifications</Text>
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
    marginLeft: 15,
    color: '#fff',
    fontSize: 36
  },
  text: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'right'
  }
});

module.exports = GithubView;
