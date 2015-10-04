'use strict';

var React = require('react'),
    Time = require('./components/hello.jsx'),
    Date = require('./components/date.jsx'),
    Syncrhonizer = require('./components/synchronizer');

Syncrhonizer.start();

var Main = React.createClass({
  render: function () {
    return (
      <div>
        <div class="row">
          <Date />
        </div>
        <div class="row">
          <Time />
        </div>
      </div>
    );
  }
})

React.render(<Main />, document.getElementById('content'));
