'use strict';

var React = require('react-native');
var Styles = require('../styles.js');
var Config = require('../env.js');
var _ = require('lodash');
var {
  StyleSheet,
  View,
  Text,
  Image
} = React;

function getGithubNotifications () {
  return fetch('https://api.github.com/notifications?access_token=' + Config.github.access_token)
  .then(function (response) {
    return response.json();
  });
}

var GithubView = React.createClass({
  getInitialState: function () {
    return {notifications: []};
  },
  componentDidMount: function () {
    getGithubNotifications().then(function (notifications) {
      this.setState({notifications: notifications})
    }.bind(this));
  },
  render: function () {
    var notifications = this.state.notifications,
        notificationViews;
    if (notifications.length > 0) {
      notificationViews = _.map(notifications, function (notification, index) {
        return (
          <View style={styles.row} key={'notification_' + index}>
            <Text style={styles.notification}>{notification.repository.full_name}</Text>
            <Text style={styles.notification}>-</Text>
            <Text style={styles.notification}>{notification.subject.title}</Text>
          </View>
        );
      });
    } else {
      notificationViews = (<View></View>);
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>{notifications.length} Work Notifications</Text>
          <Image source={require('image!github')} style={styles.image} />
        </View>
        {notificationViews}
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
    fontSize: 36
  },
  text: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'right'
  },
  notification: {
    color: '#fff',
    fontSize: Styles.fontSize.small,
    marginLeft: 10
  }
});

module.exports = GithubView;
