'use strict';

var React = require('react-native'),
    moment = require('moment'),
    Styles = require('./styles.js');
var {
  StyleSheet,
  View,
  Text
} = React;

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
    var date = this.state.date.format('MMMM D, YYYY');
    return (
      <Text style={styles.date}>{date}</Text>
    );
  }
});

var styles = StyleSheet.create({
  date: {
    fontSize: Styles.fontSize.normal,
    color: '#fff'
  }
});

module.exports = DateView;
