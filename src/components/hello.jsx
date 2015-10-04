'use strict';

var React = require('React'),
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
    var now = this.state.time.format('hh:mm:ss');
    return <div className="clock">Hello World, the time is {now}</div>
  }
});
