import { combineReducers } from 'redux'

import quoteReducer from './quote-reducer';
import weatherReducer from './weather-reducer';
import wikiReducer from './wiki-reducer';

export default combineReducers({
  quote: quoteReducer,
  weather: weatherReducer,
  wikis: wikiReducer,
});