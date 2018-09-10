import axios from 'axios';
import _$ from 'jquery';

import { 
  FETCH_QUOTE,
  FETCH_WEATHER,
  FETCH_WIKI,
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

  let res = {};
  if (coords) {
    res = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: coords.lat,
        lon: coords.lon,
        units: 'imperial',
        appid: '9c6ae69be4e5e88ee8d1066a05d9fd8f',
      }
    });
  } else {
    res = { message: "Location could not be determined"};
  }
  dispatch({ type: FETCH_WEATHER, payload: res.data });
}

export const fetchWiki = searchTerm => async dispatch => {
  const res = await _$.ajax({
    url: `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}`,
    dataType: 'jsonp'
  });

  let payload = {
    searchTerm: null,
    data: []
  };
  if (res) {
    payload.searchTerm = res[0];
    for (let i = 0; i < res[1].length; i++) {
      payload.data.push({
        title: res[1][i],
        preview: res[2][i],
        url: res[3][i]
      });
    }
  }

  dispatch({ type: FETCH_WIKI, payload: payload });
}