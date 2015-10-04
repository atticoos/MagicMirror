'use strict';

var React = require('react'),
    TimeComponent = require('./components/time.jsx'),
    DateComponent = require('./components/date.jsx'),
    WeatherComponent = require('./components/weather.jsx'),
    Syncrhonizer = require('./components/synchronizer');

Syncrhonizer.start();

var Main = React.createClass({
  render: function () {
    return (
      <div>
        <div class="row">
          <DateComponent />
        </div>
        <div class="row">
          <TimeComponent />
        </div>
        <div class="row">
          <WeatherComponent />
        </div>
      </div>
    );
  }
})

React.render(<Main />, document.getElementById('content'));
