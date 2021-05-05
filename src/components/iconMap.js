import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  Thunderstorm: faBolt,
  Drizzle: faCloudRain,
  Rain: faCloudShowersHeavy,
  Snow: faSnowflake,
  Clear: faSun,
  Clouds: faCloud,
  default: faSmog,
};

export default iconMap;
