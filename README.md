# (Forked) React - weather-app
 Small adjustments made to:
https://rawfour.github.io/weather-app-react/

Using as a raspberry pi dashboard.

## Table of contents
* [Instructions](#Instructions)
* [Description](#Description)
* [Technologies](#Technologies)


## Instructions

First clone this repository.
```bash
$ git clone https://github.com/rawfour/weather-app-react.git
```

Install dependencies. Make sure you already have [`nodejs`](https://nodejs.org/en/) & [`npm`](https://www.npmjs.com/) installed in your system.
```bash
$ npm install # or yarn
```

Run it
```bash
$ npm start # or yarn start
```

Build it
```bash
$ npm run build
```

Update the raspberry pi
```bash
$ npm run build  # update the lastest build
$ scp -r build/ pi@192.168.0.234:/home/pi/weather-app-react # copy to raspberry pi
# reboot the raspberry pi
```

## Description
This is a simple react weather app using OpenWeatherMap API.
 
## Technologies
Project uses:
* React
* Styled Component

