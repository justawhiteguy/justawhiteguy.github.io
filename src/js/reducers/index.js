import { combineReducers } from 'redux'

import quoteReducer from './quote-reducer';
import weatherReducer from './weather-reducer';

export default combineReducers({
  quote: quoteReducer,
  weather: weatherReducer,
});