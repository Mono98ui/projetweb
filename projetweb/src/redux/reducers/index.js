import { combineReducers } from 'redux';
import { searchReducer } from './search';
import { loginReducer } from './loginReducer';
import { registrationReducer } from './registrationReducer';
import { alertReducer } from './alertReducer';
import { productReducer } from './product';

const allReducers = combineReducers({
  search: searchReducer,
  login: loginReducer,
  register: registrationReducer,
  alert: alertReducer,
  product: productReducer,
});

export default allReducers;
