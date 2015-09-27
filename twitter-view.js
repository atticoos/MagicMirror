'use strict';
var React = require('react-native'),
    Styles = require('./styles.js'),
    TweenState = require('react-tween-state'),
    // Twitter = require('node-twitter'),
    Config = require('./env.js');

var {
  StyleSheet,
  View,
  Text,
  Image
} = React;

var tweets = [{
  text: '#Office365 calendar tip to help book your rooms. How to add #meetingroom calendars.',
  user: '@Robinpowered'
}, {
  text: 'Congress does not regulate Wall Street; Wall Street regulates Congress. But the time has come to say enough is enough!',
  user: '@BernieSanders'
}, {
  text: 'Spelling snafu? Press the up arrow (long press on mobile) to quickly edit your last message, and preserve your dignity. #SlackTips 😮👆',
  user: '@SlackHQ'
}];

function getTweets () {
  return new Promise(function (resolve, reject) {
    // twitterClient.statusesUserTimeline({screen_name: 'atticoos'}, function (error, tweets) {
    //   if (error) {
    //     reject(error);
    //   } else {
    //     console.log('das tweets', tweets);
    //     resolve(tweets);
    //   }
    // });
  });
}

var TwitterView = React.createClass({
  mixins: [TweenState.Mixin],
  getInitialState: function () {
    return {tweet: 0};
  },
  rotate: function () {
    var next = this.state.tweet + 1;
    console.log('state', this.state.tweet, next, tweets.length, tweets);
    if (next === tweets.length) {
      next = 0;
    }
    console.log('next tweet', next, tweets);
    this.setState({tweet: next});
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
    getTweets();
    setTimeout(this.fade.bind(this, 0), 1000);
  },
  render: function () {
    var tweet = tweets[this.state.tweet];
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Latest Tweets</Text>
          <Image source={require('image!twitter')} style={styles.image} />
        </View>

        <View style={[styles.tweet, {opacity: this.getTweeningValue('opacity')}]}>
          <Text style={styles.text}>{tweet.text}</Text>
          <Text style={styles.text}>{tweet.user}</Text>
        </View>

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
  text: {
    color: '#fff',
    fontSize: Styles.fontSize.small,
    textAlign: 'right',
    opacity: 1
  }
});

module.exports = TwitterView;
