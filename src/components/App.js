import React from 'react';
import styled from 'styled-components';
import SearchCity from './SearchCity';
import Result from './Result';
import NotFound from './NotFound';

const moment = require('moment');

// const AppTitle = styled.h1`
//   display: block;
//   height: 64px;
//   margin: 0;
//   padding: 20px 0;
//   font-size: 20px;
//   text-transform: uppercase;
//   font-weight: 400;
//   color: #ffffff;
//   transition: 0.3s 1.4s;
//   opacity: ${({ showLabel }) => (showLabel ? 1 : 0)};

//   ${({ secondary }) =>
//     secondary &&
//     `
//     opacity: 1;
//     height: auto;
//     position: relative;
//     padding: 20px 0;
//     font-size: 30px;
//     top: 20%;
//     text-align: center;
//     transition: .5s;
//     @media ${device.tablet} {
//       font-size: 40px;
//     }
//     @media ${device.laptop} {
//       font-size: 50px;
//     }
//     @media ${device.laptopL} {
//       font-size: 60px;
//     }
//     @media ${device.desktop} {
//       font-size: 70px;
//     }

//   `}

//   ${({ showResult }) =>
//     showResult &&
//     `
//     opacity: 0;
//     visibility: hidden;
//     top: 10%;
//   `}
// `;

const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
`;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class App extends React.Component {
  state = {
    value: 'Oakland, CA',
    city: 'Oakland',
    stateCode: 'CA',
    coord: null,
    weatherInfo: null,
    error: false,
  };

  handleInputChange = e => {
    const city = e.target.value.split(',')[0] || null;
    const stateCode = e.target.value.split(',')[1] || null;
    this.setState({
      value: e.target.value,
      city: city !== null ? city.trim() : city,
      stateCode: stateCode !== null ? stateCode.trim() : stateCode,
      coord: null,
    });
  };

  handleSearchCity = async e => {
    // eslint-disable-next-line no-unused-expressions
    e && e.preventDefault();
    // const { value } = this.state;
    const { city, stateCode } = this.state;
    let { coord } = this.state;
    const APIkey = window.env.REACT_APP_API_KEY;

    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${city},${stateCode},US&APPID=${APIkey}&units=imperial`;
    if (coord === null) {
      Promise.all([fetch(weather)])
        .then(([res]) => {
          if (res.ok) {
            return Promise.all([res.json()]);
          }
          throw Error(res.statusText);
        })
        .then(([res]) => {
          this.setState({ coord: res.coord });
        });
    }

    while (coord === null) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(1000);
      // eslint-disable-next-line react/destructuring-assignment
      coord = this.state.coord;
    }
    const forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${APIkey}&units=imperial&exclude=minutely`;
    Promise.all([fetch(weather), fetch(forecast)])
      .then(([res1, res2]) => {
        if (res1.ok && res2.ok) {
          return Promise.all([res1.json(), res2.json()]);
        }
        throw Error(res1.statusText, res2.statusText);
      })
      .then(([data1, data2]) => {
        const currentDate = new Date();
        const date = moment(currentDate)
          .utcOffset(-currentDate.getTimezoneOffset())
          .format('dddd MMMM Do');

        const sunsetDate = new Date(data1.sys.sunset * 1000);
        const sunriseDate = new Date(data1.sys.sunrise * 1000);
        const tzOffset = data1.timezone / 60;

        const sunset = moment(sunsetDate)
          .utcOffset(tzOffset)
          .format('h:mm a');
        const sunrise = moment(sunriseDate)
          .utcOffset(tzOffset)
          .format('h:mm a');

        const temps = data2.hourly.map(hour => hour.temp);
        const tempMax = temps.reduce(function max(a, b) {
          return Math.max(a, b);
        });
        const tempMin = temps.reduce(function min(a, b) {
          return Math.min(a, b);
        });

        const hourlyForecast = data2.hourly
          .filter(hour => hour.dt * 1000 > currentDate.getTime())
          .filter((hour, index) => index % 3 === 0);

        const weatherInfo = {
          city: data1.name,
          stateCode,
          date,
          description: data1.weather[0].description,
          main: data1.weather[0].main,
          temp: data1.main.temp,
          highestTemp: tempMax,
          lowestTemp: tempMin,
          sunrise,
          sunset,
          clouds: data1.clouds.all,
          humidity: data1.main.humidity,
          wind: data1.wind.speed,
          forecast: hourlyForecast.slice(1), // each element is 3 hours,
          latestUpdate: moment(currentDate).format('MMM Do HH:mm:ss'),
        };
        this.setState({
          weatherInfo,
          error: false,
        });
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);

        this.setState({
          error: true,
          weatherInfo: null,
        });
      });
  };

  componentDidMount = async () => {
    const { city } = this.state;
    if (city !== null) {
      const thisBoundSearchCity = this.handleSearchCity.bind(this);
      thisBoundSearchCity();
      setInterval(thisBoundSearchCity, 600 * 1000); // refresh every 10 minutes
    }
  };

  render() {
    const { value, weatherInfo, error } = this.state;
    return (
      <>
        <WeatherWrapper>
          <SearchCity
            value={value}
            showResult={(weatherInfo || error) && true}
            change={this.handleInputChange}
            submit={this.handleSearchCity}
          />
          {weatherInfo && <Result weather={weatherInfo} />}
          {error && <NotFound error={error} />}
        </WeatherWrapper>
      </>
    );
  }
}

export default App;
