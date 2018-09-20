
export function setTokens (state, {accessToken, refreshToken}) {
  state.accessToken = accessToken
  state.refreshToken = refreshToken
}

export function setAuthentication (state, value) {
  state.authenticated = value
}

export function setUser (state, user) {
  state.user = user
}
