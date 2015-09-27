'use strict';

var React = require('react-native'),
    moment = require('moment'),
    Styles = require('../styles.js');
var {
  StyleSheet,
  View,
  Text
} = React;

function getOrdinal (day) {
  var ordinals = ['th', 'st', 'nd', 'rd'],
      modulus = day%100;
  return day + (ordinals[modulus - 20]%10) || ordinals[modulus] || ordinals[0];
}

var DateView = React.createClass({
  getInitialState: function () {
    return {date: moment()};
  },
  tick: function () {
    this.setState({date: moment()});
  },
  componentDidMount: function () {
    this.interval = setInterval(this.tick, 1000 * 60 * 60);
  },
  componentWillUnmount: function () {
    clearInterval(this.interval);
  },
  render: function () {
    var date = this.state.date.format('dddd, MMMM D'),
        ordinal = this.state.date.format('');
    return (
      <View style={styles.row}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.ordinal}>{getOrdinal(this.state.date.day())}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  date: {
    fontSize: Styles.fontSize.normal,
    color: '#fff'
  },
  ordinal: {
    color: '#fff',
    fontSize: Styles.fontSize.normal-10
  }
});

module.exports = DateView;
