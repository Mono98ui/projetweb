import { setUserSession, removerUserSession } from '../../utils/common';

// Handles all http communication with backend apis

// TODO: Replace all localhost hardcoded

export const userService = {
  login,
  logout,
  register,
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch('https://localhost:44384/api/Users/auth', requestOptions)
    .then(handleResponse)
    .then((user) => {
      setUserSession(user.Token, user.Username, user.UserId);
      return user;
    });
}

function logout() {
  removerUserSession();
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch('https://localhost:44384/api/Users/register', requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        Location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
