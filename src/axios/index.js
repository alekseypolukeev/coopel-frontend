import axios from 'axios'

const TOKEN_PATH = '/oauth/token'

export function makeAxiosClient (baseUrl, clientId, clientSecret, store) {
  const axiosClient = axios.create({
    baseURL: baseUrl,
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })

  axiosClient.interceptors.response.use(response => {
    return response
  }, err => {
    const error = err.response
    if (error.status === 401 && error.config) {
      if (error.config.__authenticationInterceptorEnabled) {
        const refreshToken = store.getters['account/getRefreshToken']
        return fetchRefreshToken(axiosClient, clientId, clientSecret, refreshToken).then(response => {
          const accessToken = response.data['access_token']
          store.dispatch('account/authenticateResponse', response).catch(reason => {
            console.error('Not authenticated after refresh token', reason)
          })
          error.config.headers.authorization = 'bearer ' + accessToken
          error.config.__authenticationInterceptorEnabled = false
          return axiosClient.request(error.config)
        }).catch(err => {
          if (err.status === 401) {
            // refresh token expired
            store.dispatch('account/doLogout', true)
          }
          return err
        })
      }
    }
    return Promise.reject(error)
  })

  return axiosClient
}

export function makeFetch (axiosClient) {
  return function (config) {
    return axiosClient.request(config)
  }
}

export function makeFetchApi (axiosClient, store) {
  return function (config) {
    const authorization = 'bearer ' + store.getters['account/getAccessToken']
    if (config.headers) {
      config.headers.authorization = authorization
    } else {
      config.headers = {authorization}
    }
    config.__authenticationInterceptorEnabled = true
    return axiosClient.request(config)
  }
}

export function makeFetchPublicApi (axiosClient) {
  return function (config) {
    return axiosClient.request(config)
  }
}

function fetchRefreshToken (axiosClient, clientId, clientSecret, refreshToken) {
  return axiosClient.request({
    url: TOKEN_PATH,
    method: 'POST',
    auth: {
      username: clientId,
      password: clientSecret
    },
    data: 'grant_type=refresh_token&refresh_token=' + refreshToken,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export function makeAuthenticate (axiosClient, clientId, clientSecret) {
  return function (username, password) {
    return axiosClient.request({
      url: TOKEN_PATH,
      method: 'POST',
      auth: {
        username: clientId,
        password: clientSecret
      },
      data: 'grant_type=password&username=' + username + '&password=' + password,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
  }
}
