import axios from 'axios';

import { 
  FETCH_QUOTE,
  FETCH_WEATHER,
} from './types';

export const fetchQuote = () => async dispatch => {
  const res = await axios.get('https://talaikis.com/api/quotes/random');
  dispatch({ type: FETCH_QUOTE, payload: res.data });
}

export const fetchWeather = () => async dispatch => {
  let coords = {};
  if (window.chrome) {
    const res = await axios.get('http://ip-api.com/json');
    if (res.data) {
      coords.lon = res.data.lon;
      coords.lat = res.data.lat;
    }
  } else if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(data => {
      coords.lon = data.coords.longitude;
      coords.lat = data.coords.latitude;
    });
  }

  // let res = {};

  const res = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat: coords.lat,
      lon: coords.lon,
      units: 'imperial',
      appid: '9c6ae69be4e5e88ee8d1066a05d9fd8f',
    }
  });

  dispatch({ type: FETCH_WEATHER, payload: res.data });
}