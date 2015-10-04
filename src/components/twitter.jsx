'use strict';

import React from 'react';
import _ from 'lodash';

const REFRESH_INTERVAL = 60 * 15 * 1000; // 15 minutes
const ROTATE_INTERVAL = 15 * 1000; // 15 seconds

class TwitterComponent extends React.Component {
  constructor (props) {
    super(props);
    this.displayName = 'twitter';
    this.state = {tweets: [], current: 0};
  }

  componentDidMount () {
    return this.updateTweets().then(function () {
      this.refreshInterval = setInterval(this.updateTweets.bind(this), REFRESH_INTERVAL);
      this.rotateInterval = setInterval(this.rotate.bind(this), ROTATE_INTERVAL);
    }.bind(this));
  }

  componentDidUnmount () {
    clearInterval(this.refreshInterval);
    clearInterval(this.rotateInterval);
  }

  updateTweets () {
    var screennames = this.props.screennames.join(',');
    return fetch('/tweets?screennames=' + screennames).then(function (response) {
      return response.json();
    }).then(function (tweets) {
      this.state.tweets = tweets;
      this.setState(this.state);
    }.bind(this));
  }

  rotate () {
    var next = this.state.current + 1;
    if (next === this.state.tweets.length) {
      next = 0;
    }
    this.state.current = next;
    this.setState(this.state);
  }

  render() {
    var tweets = this.state.tweets;
    var current = this.state.current;

    var tweetElements = _.map(tweets, function (tweet, index) {
      return (
        <div key={index} className={index === current ? 'active' : ''}>
          {tweet.text}
          <br/>
          @{tweet.user.screen_name}
        </div>
      );
    });

    return (
      <div className="tweets">
        <h2>Latest Tweets</h2>
        <div className="tweet">
        {{tweetElements}}
        </div>
      </div>
    )
  }
}

export default TwitterComponent;
