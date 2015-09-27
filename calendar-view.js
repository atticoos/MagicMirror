'use strict';

var React = require('react-native');
var Styles = require('./styles.js');
var {
  StyleSheet,
  View,
  Text,
  Image
} = React;

var CalendarView = React.createClass({
  getInitialState: function () {
    return {events: []};
  },
  render: function () {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Phone bill due tomorrow</Text>
          <Image source={require('image!calendar')} style={styles.image} />
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
  }
});

module.exports = CalendarView;
