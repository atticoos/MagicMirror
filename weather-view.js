'use strict';

var React = require('react-native');
    // Config = require('./env.js');
var {
  StyleSheet,
  View,
  Text
} = React;

var WeatherView = React.createClass({
  getInitialState: function () {
    return {weather: null};
  },
  tick: function () {
    // fetch weather information
  },
  componentDidMount: function () {
    // fetch weather information
  },
  componentWillUnmount: function () {
    clearInterval(this.interval);
  },
  render: function () {
    var weather = this.weather;
    return (
      <Text style={styles.weather}>Das Weather</Text>
    );
  }
});

var styles = StyleSheet.create({
  weather: {
    fontSize: 32,
    color: '#fff'
  }
});

module.exports = WeatherView;
