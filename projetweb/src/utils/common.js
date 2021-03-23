// Return the user data from the local storage
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
};

// Return the user id data from the local storage
export const getUserId = () => {
  return localStorage.getItem('userId');
};

// Return the token from the local storage
export const getToken = () => {
  return localStorage.getItem('token') || null;
};

// Remove the token and user from the local storage
export const removerUserSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('userId');
};

// Set the token and user from the local storage
export const setUserSession = (token, user, userId) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('userId', userId);
};

export const setProductId = (id) => {
  sessionStorage.setItem('productId', id);
};

export const getProductId = () => +sessionStorage.getItem('productId');

export const destroyProductId = () => {
  const productId = getProductId();
  sessionStorage.removeItem('productId');
  return productId;
};
