export const productReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCHPRODUCTCPU':
      return action.value;
    case 'FETCHPRODUCTGPU':
      return action.value;
    case 'FETCHPRODUCTRAM':
      return action.value;
    case 'FETCHPRODUCTMOBO':
      return action.value;
    case 'FETCHPRODUCTSTORAGE':
      return action.value;
    default:
      return state;
  }
};
