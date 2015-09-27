'use strict';
var React = require('react-native'),
    Styles = require('./styles.js');
var {
  StyleSheet,
  View,
  Text,
  Image
} = React;

var TwitterView = React.createClass({
  getInitialState: function () {
    return {tweets: []};
  },

  render: function () {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Image source={require('image!twitter')} style={styles.image} />
          <Text style={styles.title}>Latest Tweets</Text>
        </View>

        <View style={styles.tweet}>
          <Text style={styles.text}>#Office365 calendar tip to help book your rooms. How to add #meetingroom calendars.</Text>
          <Text style={styles.text}>@robinpowered</Text>
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

module.exports = TwitterView;
