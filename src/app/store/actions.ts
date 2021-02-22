export enum ActionTypes {
  Add = '[Item] Add to favourites',
  Remove = '[Item] Remove from favourites',
  LoadItems = '[Items] Load',
  SelectCategory = '[Category] Select'
}

export const AddToFavourites = payload => {
  return {
    type: ActionTypes.Add,
    payload
  };
};

export const RemoveFromFavourites = (payload: any) => ({
  type: ActionTypes.Remove,
  payload
});

export const LoadItems = (payload: any) => ({
  type: ActionTypes.LoadItems,
  payload
});

export const SelectCategory = (payload: any) => ({
  type: ActionTypes.SelectCategory,
  payload
});
