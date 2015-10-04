# Magic Mirror

Turn your old tablets into a smart mirror display!

Inspired by [HannahMitt/HomeMirror](https://github.com/HannahMitt/HomeMirror)

### Environment Configuration
`env.js` must be defined in the root of the project with the following keys
```json
{
  "forecast": {
    "access_token": "forecast.io token"
  },
  "github": {
    "access_token": ""
  },
  "twitter": {
    "consumer_key": "",
    "consumer_token": "",
    "access_token_key": "",
    "access_token_secret": ""
  }
}
```

![slack for ios upload-1](https://cloud.githubusercontent.com/assets/656630/10124734/69f7050a-652a-11e5-8fa5-b6368a38d665.jpg)


<img width="300" alt="screen shot 2015-09-27 at 12 37 49 pm" src="https://cloud.githubusercontent.com/assets/656630/10124725/3a2a5e8a-652a-11e5-97a2-756ba0646ae3.png">


### "Hardware" Build Guide
- [x] Plexiglass (or two-way mirror)
- [x] Privacy mirror film [like this](http://www.homedepot.com/p/Gila-3-ft-x-15-ft-Mirror-Privacy-Window-Film-PRS361/100196546) (or two-way mirror)
- [x] Velcro
- [x] Tablet
- [x] Black construction paper

### "Software" Build Guide
```
npm install -g react-native-cli
npm install
react-native run-android
```
