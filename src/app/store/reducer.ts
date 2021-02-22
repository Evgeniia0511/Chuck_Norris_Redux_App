import { ActionTypes } from './actions';
import { IJoke } from '../interfaces/joke.interface';
import {ICategory} from '../interfaces/category.interface';

export interface InitialState {
  jokes: IJoke[];
  favourites: IJoke[];
  categories: ICategory[];
}
export const initialState = {
  jokes: JSON.parse(localStorage.getItem('jokes')).length ? JSON.parse(localStorage.getItem('jokes')) : [],
  favourites: JSON.parse(localStorage.getItem('favourites')).length ? JSON.parse(localStorage.getItem('favourites')) : [],
  categories: JSON.parse(localStorage.getItem('categories')).length ? JSON.parse(localStorage.getItem('categories')) : [],
};

function setSavedState(state: any, localStorageKey: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}

export function FavouritesReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LoadItems:
      setSavedState([...action.payload], 'jokes');
      return {
        ...state,
        jokes: [...action.payload]
      };
    case ActionTypes.SelectCategory:
      setSavedState([...action.payload], 'categories');
      return {
        ...state,
        categories: [...action.payload]
      };
    case ActionTypes.Add:
      setSavedState([...state.favourites, action.payload], 'favourites');
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      };
    case ActionTypes.Remove:
      setSavedState([...state.favourites.filter(item => item['id'] !== action.payload.id)], 'favourites');
      return {
        ...state,
        favourites: [...state.favourites.filter(item => item['id'] !== action.payload.id)]
      };

    default:
      return state;
  }
}
