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
      <div className="root">
        <div className="widget-area top left"></div>

        <div className="widget-area top right">
          <div className="row">
            <DateComponent />
          </div>
          <div className="row">
            <TimeComponent />
          </div>
        </div>

        <div className="widget-area bottom left">
          <div className="row">
            <WeatherComponent />
          </div>
        </div>

        <div className="widget-area bottom right">
          <div className="row">
            <TwitterComponent screennames={twitterScreennames}></TwitterComponent>
          </div>
          <div className="row">
            <GithubComponent></GithubComponent>
          </div>
        </div>
      </div>
    );
  }
}

React.render(<Main />, document.getElementById('content'));
