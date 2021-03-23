export const searchReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCHCPUS':
      return action.value;
    case 'FETCHGPUS':
      return action.value;
    case 'FETCHMOBOS':
      return action.value;
    case 'FETCHRAMS':
      return action.value;
    case 'FETCHSTORAGES':
      return action.value;
    default:
      return state;
  }
};
