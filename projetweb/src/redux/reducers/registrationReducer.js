import { userConstants } from '../constants/userConstants';

export function registrationReducer(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { isRegistering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
}
