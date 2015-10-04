var currentSha;

function getSha () {
  return fetch('/sha').then(function (response) {
    return response.json();
  }).then(function (data) {
    return data.sha;
  });
}

function synchronize () {
  return getSha().then(function (sha) {
    var content = document.querySelector('#content');
    if (currentSha !== sha) {
      window.location = '/';
    }
  })
}

module.exports = {
  start: function () {
    getSha().then(function (sha) {
      currentSha = sha;
      setInterval(synchronize, 10000);
    });
  }
};
