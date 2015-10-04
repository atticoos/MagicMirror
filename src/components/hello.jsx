'use strict';

var React = require('react'),
    moment = require('moment');

module.exports = React.createClass({
  displayName: 'helo',
  getInitialState: function () {
    return {time: moment()};
  },
  tick: function () {
    this.setState({time: moment()});
  },
  componentDidMount: function () {
    this.interval = setInterval(this.tick, 1000);
  },
  componentDidUnmount: function () {
    clearInterval(this.interval);
  },
  render: function () {
    var now = this.state.time.format('h:mm:ss');
    return <div className="clock">Test {now}</div>
  }
});
