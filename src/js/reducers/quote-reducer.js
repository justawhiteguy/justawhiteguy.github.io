import { FETCH_QUOTE } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_QUOTE:
      return action.payload;
    default:
      return state;
  }
}