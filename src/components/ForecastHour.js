import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SmallLabel from './SmallLabel';
import Text from './Text';
import device from '../responsive/Device';
import iconMap from './iconMap';

const ForecastWrapper = styled.div`
  flex-shrink: 0;
  flex-basis: 90px;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  @media ${device.tablet} {
    flex-basis: 110px;
  }
  @media ${device.laptop} {
    flex-basis: 125px;
  }
  @media ${device.laptopL} {
    flex-basis: 140px;
  }
`;

const WeatherIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
`;

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'Nocvember',
  'December',
];

const ForecastHour = props => {
  const { dt, temp, main } = props;
  const dateTime = new Date(dt * 1000);
  const now = new Date();
  const forecastTime = dateTime - now;
  const hoursAhead = Math.floor(forecastTime / (3600 * 1000));
  console.log('Forecase time', hoursAhead);
  const weatherIcon = <FontAwesomeIcon icon={iconMap[main] || iconMap.default} size="lg" />;
  return (
    <ForecastWrapper>
      <Text align="center">
        {months[dateTime.getMonth()]} {dateTime.getDate()}
      </Text>
      <Text align="center">+{hoursAhead}h</Text>
      <WeatherIconWrapper>{weatherIcon}</WeatherIconWrapper>
      <SmallLabel align="center" weight="400">
        {temp}&#176;
      </SmallLabel>
    </ForecastWrapper>
  );
};

ForecastHour.propTypes = {
  dt: PropTypes.number.isRequired,
  temp: PropTypes.number.isRequired,
  main: PropTypes.string.isRequired,
};

export default ForecastHour;
