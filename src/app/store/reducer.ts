import { ActionTypes } from './actions';
import { IJoke } from '../interfaces/joke.interface'

export interface InitialState {
  jokes: IJoke[];
  favourites: IJoke[];
}
export const initialState = {
  jokes: [],
  favourites: []
};

export function FavouritesReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.LoadSuccess:
      return {
        ...state,
        jokes: [...action.payload]
      };
    case ActionTypes.Add:
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      };
    case ActionTypes.Remove:
      return {
        ...state,
        favourites: [...state.favourites.filter(item => item['id'] !== action.payload.id)]
      };

    default:
      return state;
  }
}
