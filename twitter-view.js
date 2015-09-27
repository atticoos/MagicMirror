'use strict';
var React = require('react-native'),
    Styles = require('./styles.js'),
    TweenState = require('react-tween-state'),
    OAuthSimple = require('oauthsimple'),
    Config = require('./env.js');

var {
  StyleSheet,
  View,
  Text,
  Image
} = React;

function getTweets () {
  var authenticatedRequest = OAuthSimple(Config.twitter.consumer_key, Config.twitter.consumer_secret).sign({
    path: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
    parameters: 'sreen_name=atticoos',
    signatures: {
      access_token: Config.twitter.access_token,
      oauth_token_secret: Config.twitter.access_token_secret
    }
  });
  return fetch(authenticatedRequest.signed_url).then(function (response) {
    return response.json();
  });
}

var TwitterView = React.createClass({
  mixins: [TweenState.Mixin],
  getInitialState: function () {
    return {tweets: [], tweet: 0};
  },
  rotate: function () {
    var next = this.state.tweet + 1;
    if (next === this.state.tweets.length) {
      next = 0;
    }
    this.state.tweet = next;
    this.setState(this.state);
    this.fade(1);
  },
  fade: function (fadeDirection) {
    this.tweenState('opacity', {
      easing: TweenState.easingTypes.linear,
      duration: 1000,
      endValue: fadeDirection,
      onEnd: function () {
        if (!fadeDirection) {
          // fade out, rotate
          this.rotate();
        } else {
          setTimeout(this.fade.bind(this, 0), 5000);
        }
      }.bind(this)
    });

  },
  componentDidMount: function () {
    getTweets().then(function (tweets) {
      this.setState({tweets: tweets, tweet: 0});
      this.fade(1);
    }.bind(this));
  },
  render: function () {
    var tweet = this.state.tweets[this.state.tweet],
        tweetView;

    if (tweet) {
      tweetView = (
        <View style={[styles.tweet, {opacity: this.getTweeningValue('opacity')}]}>
          <Text style={styles.text}>{tweet.text}</Text>
          <Text style={styles.text}>{tweet.user.screen_name}</Text>
        </View>
      );
    } else {
      tweetView = (<View></View>);
    }
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Latest Tweets</Text>
          <Image source={require('image!twitter')} style={styles.image} />
        </View>
        {tweetView}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  image: {
    height: 40,
    width: 40
  },
  title: {
    marginRight: 15,
    color: '#fff',
    fontSize: Styles.fontSize.medium
  },
  tweet: {
    opacity: 0
  },
  text: {
    color: '#fff',
    fontSize: Styles.fontSize.small,
    textAlign: 'right'
  }
});

module.exports = TwitterView;
