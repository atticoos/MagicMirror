'use strict';

var React = require('react'),
    Hello = require('./components/hello'),
    Syncrhonizer = require('./components/synchronizer');

Syncrhonizer.start();

React.render(<Hello />, document.getElementById('content'));
