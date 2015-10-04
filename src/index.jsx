'use strict';

import React from 'react';
import TimeComponent from './components/time.jsx';
import DateComponent from './components/date.jsx';
import WeatherComponent from './components/weather.jsx';
import TwitterComponent from './components/twitter.jsx';
import GithubComponent from './components/github.jsx';
import Syncrhonizer from './components/synchronizer.js';

Syncrhonizer.start();

class Main extends React.Component {
  render () {
    var twitterScreennames = [
      'atticoos',
      'robinpowered',
      'berniesanders',
      'elonmusk'
    ];
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
        <div class="row">
          <TwitterComponent screennames={twitterScreennames}></TwitterComponent>
        </div>
        <div class="row">
          <GithubComponent></GithubComponent>
        </div>
      </div>
    );
  }
}

React.render(<Main />, document.getElementById('content'));
