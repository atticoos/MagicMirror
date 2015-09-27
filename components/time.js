'use strict';

var React = require('react-native');
var moment = require('moment');
var Styles = require('../styles.js');
var {
  StyleSheet,
  View,
  Text
} = React;

var TimeView = React.createClass({
  getInitialState: function () {
    return {time: moment()};
  },
  tick: function () {
    this.setState({time: moment()});
  },
  componentDidMount: function () {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function () {
    clearInterval(this.interval);
  },
  render: function () {
    var time = this.state.time.format('h:mm:ss a');
    return (
      <Text style={styles.time}>{time}</Text>
    );
  }
});

var styles = StyleSheet.create({
  time: {
    fontSize: Styles.fontSize.large,
    color: '#fff'
  }
});

module.exports = TimeView;
