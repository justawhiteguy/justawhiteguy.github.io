import { FETCH_WIKI } from '../actions/types';

const DEFAULT_STATE = {
  searchTerm: '',
  data: []
}

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_WIKI:
      return action.payload;
    default:
      return state;
  }
}