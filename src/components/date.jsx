'use strict';

var React = require('react'),
    moment = require('moment');

module.exports = React.createClass({
  displayName: 'date',
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
    var now = this.state.time.format('dddd, MMMM D');
    return <div className="date">{now}</div>
  }
});
