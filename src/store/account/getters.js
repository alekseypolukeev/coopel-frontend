export function isAuthenticated (state) {
  return state.authenticated
}

export function getAccessToken (state) {
  return state.accessToken
}

export function getRefreshToken (state) {
  return state.refreshToken
}

export function getUser (state) {
  return state.user
}

export function getUserFullName (state, getters) {
  const user = getters.getUser
  return user ? user.lastName + ' ' + user.firstName : ''
}

export function getAuthorities (state, getters) {
  const user = getters.getUser
  return user && user.authorities ? user.authorities : []
}

export function hasUserRole (state, getters) {
  const authorities = getters.getAuthorities
  return authorities.indexOf('R_U') > -1
}

export function hasCooperativeRole (state, getters) {
  const authorities = getters.getAuthorities
  return authorities.filter(authority => authority.startsWith('CR_')).length !== 0
}

export function isNeedConfirmationStepper (state, getters) {
  return !getters.hasUserRole || !getters.hasCooperativeRole
}

export function getCooperativeIds (state, getters) {
  const authorities = getters.getAuthorities
  return Array.from(
    new Set(authorities.filter(authority => authority.startsWith('CR_'))
      .map(authority => {
        const pos = authority.lastIndexOf('_')
        return Number(authority.substring(pos, authority.length))
      })
    )
  )
}

export function getCooperativesCount (state, getters) {
  return getters.getCooperativeIds.length
}
