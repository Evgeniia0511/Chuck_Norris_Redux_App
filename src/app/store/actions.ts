export enum ActionTypes {
  Add = '[Product] Add to favourites',
  Remove = '[Product] Remove from favourites',
  LoadItems = '[Products] Load items from server',
  LoadSuccess = '[Products] Load success'
}
export const AddToFavourites = (payload: any) => {
  return {
    type: ActionTypes.Add,
    payload
  };
};
export const GetItems = () => ({
  type: ActionTypes.LoadItems
});
export const RemoveFromFavourites = (payload: any) => ({
  type: ActionTypes.Remove,
  payload
});
export const LoadItems = (payload: any) => ({
  type: ActionTypes.LoadSuccess,
  payload
});
