import React from 'react';
import './Result.sass';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import device from '../responsive/Device';
import ForecastHour from './ForecastHour';
import ResultFadeIn from './ResultFadeIn';
import BigLabel from './BigLabel';
import MediumLabel from './MediumLabel';
import SmallLabel from './SmallLabel';
import UpdatedAt from './UpdatedAt';
import Text from './Text';
import iconMap from './iconMap';

const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 0;
  opacity: 0;
  visibility: hidden;
  position: relative;
  top: 20px;
  animation: ${ResultFadeIn} 0.5s 1.4s forwards;
`;

const LocationWrapper = styled.div`
  flex-basis: 100%;
`;

const TodayWeatherWrapper = styled.div`
  flex-basis: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto 1fr;
  margin: 20px 0;
  grid-gap: 30px;
  background-color: #24242425;
  border-radius: 10px;
`;

const CurrentWeatherWrapper = styled.div`
  flex-basis: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto 1fr;
  margin: 20px 0;
  grid-gap: 30px;
  @media ${device.mobileL} {
    flex-basis: 50%;
    padding-right: 10px;
  }
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
    padding-right: 20px;
  }
`;

const WeatherIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 100px;
    justify-content: flex-end;
  }
  @media ${device.laptop} {
    font-size: 120px;
  }
  @media ${device.laptopL} {
    font-size: 140px;
  }
`;

const TemperatureWrapper = styled.div``;

const Temperature = styled.h3`
  display: block;
  font-size: 50px;
  font-weight: 400;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 70px;
  }
  @media ${device.laptop} {
    font-size: 90px;
  }
  @media ${device.laptopL} {
    font-size: 110px;
  }
`;

const WeatherDetailsWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  margin: 20px 0;
  border-radius: 10px;
  align-self: flex-start;
  @media ${device.mobileL} {
    flex-basis: 50%;
  }
`;

const WeatherDetail = styled.div`
  flex-basis: calc(100% / 3);
  padding: 10px;
  @media ${device.laptop} {
    padding: 20px 10px;
  }
`;

const ForecastWrapper = styled.div`
  flex-basis: 100%;
  margin: 20px 0;
  overflow: hidden;
`;

const Forecast = styled.div`
  position: relative;
  display: flex;
  overflow-x: hidden;
  overflow-y: hidden;
  scrollbar-color: lightgray #ffffff;
  scrollbar-width: thin;
  margin-top: 20px;
  padding-bottom: 20px;
  @media ${device.laptop} {
    order: 4;
  }
`;

const Result = ({ weather }) => {
  const {
    city,
    stateCode,
    date,
    description,
    main,
    temp,
    sunset,
    sunrise,
    humidity,
    wind,
    highestTemp,
    lowestTemp,
    forecast,
    latestUpdate,
  } = weather;

  const forecasts = forecast.map(item => (
    <ForecastHour
      key={item.dt}
      dt={item.dt}
      temp={Math.floor(item.temp * 1) / 1}
      main={item.weather[0].main}
    />
  ));

  const weatherIcon = <FontAwesomeIcon icon={iconMap[main] || iconMap.default} />;
  return (
    <Results>
      <LocationWrapper>
        <BigLabel>
          {city}, {stateCode}
        </BigLabel>
        <div style={{ clear: 'both' }}>
          <SmallLabel weight="400" style={{ float: 'left' }}>
            {date}
          </SmallLabel>
          <UpdatedAt style={{ float: 'right' }}>Last Updated: {latestUpdate}</UpdatedAt>
        </div>
      </LocationWrapper>
      <TodayWeatherWrapper>
        <CurrentWeatherWrapper>
          <WeatherIcon>{weatherIcon}</WeatherIcon>
          <TemperatureWrapper>
            <Temperature>{Math.floor(temp)}&#176;</Temperature>
            <SmallLabel weight="400" firstToUpperCase>
              {description}
            </SmallLabel>
          </TemperatureWrapper>
        </CurrentWeatherWrapper>
        <WeatherDetailsWrapper>
          <WeatherDetail>
            <SmallLabel align="center" weight="500">
              {Math.floor(highestTemp)}&#176;
            </SmallLabel>
            <Text align="center">High</Text>
          </WeatherDetail>
          <WeatherDetail>
            <SmallLabel align="center" weight="500">
              {wind}mph
            </SmallLabel>
            <Text align="center">Wind</Text>
          </WeatherDetail>
          <WeatherDetail>
            <SmallLabel align="center" weight="500">
              {sunrise}
            </SmallLabel>
            <Text align="center">Sunrise</Text>
          </WeatherDetail>
          <WeatherDetail>
            <SmallLabel align="center" weight="500">
              {Math.floor(lowestTemp)}&#176;
            </SmallLabel>
            <Text align="center">Low</Text>
          </WeatherDetail>
          <WeatherDetail>
            <SmallLabel align="center" weight="500">
              {humidity}%
            </SmallLabel>
            <Text align="center">Humidity</Text>
          </WeatherDetail>
          <WeatherDetail>
            <SmallLabel align="center" weight="500">
              {sunset}
            </SmallLabel>
            <Text align="center">Sunset</Text>
          </WeatherDetail>
        </WeatherDetailsWrapper>
      </TodayWeatherWrapper>
      <ForecastWrapper>
        <MediumLabel weight="400">Forecast</MediumLabel>
        <Forecast>{forecasts}</Forecast>
      </ForecastWrapper>
    </Results>
  );
};

Result.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string,
    stateCode: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    main: PropTypes.string,
    temp: PropTypes.number,
    sunrise: PropTypes.string,
    sunset: PropTypes.string,
    humidity: PropTypes.number,
    wind: PropTypes.number,
    highestTemp: PropTypes.number,
    lowestTemp: PropTypes.number,
    forecast: PropTypes.array,
    latestUpdate: PropTypes.string,
  }).isRequired,
};

export default Result;
