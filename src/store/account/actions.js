import Vue from 'vue'
import { Cookies, Dialog } from 'quasar'

export function authenticateResponse ({ state, commit }, authResponse) {
  const data = authResponse.data
  const accessToken = data['access_token']
  const refreshToken = data['refresh_token']
  // const expiresIn = data['expires_in']

  return authenticate({ state, commit }, {accessToken, refreshToken})
}

export function authenticate ({ state, commit }, {accessToken, refreshToken}) {
  return new Promise((resolve, reject) => {
    commit('setTokens', {
      accessToken,
      refreshToken
    })

    const isDev = process.env.NODE_ENV === 'dev'
    // const atExpDate = new Date(Date.now() + expiresIn * 1000)

    Cookies.set('at', accessToken, {
      path: '/',
      expires: 365, // atExpDate,
      secure: !isDev
    })
    Cookies.set('rt', refreshToken, {
      path: '/',
      expires: 365,
      secure: !isDev
    })

    Vue.prototype.$axios.fetchApi({
      url: '/v1/users/me'
    }).then(response => {
      if (response.status === 200) {
        commit('setAuthentication', true)
        commit('setUser', response.data)
        resolve(response)
      } else {
        reject(response)
      }
    }).catch(reason => {
      doLogout({ state, commit }, false)
      reject(reason)
    })
  })
}

export function doLogout ({ state, commit }, notify) {
  commit('setAuthentication', false)
  commit('setTokens', {
    accessToken: null,
    refreshToken: null
  })

  Cookies.remove('at')
  Cookies.remove('rt')

  commit('setUser', {})

  if (notify) {
    Dialog.create({
      title: 'Внимание',
      message: 'Сессия завершена. Вы будете перенаправлены на страницу авторизации.',
      color: 'info',
      ok: true,
      preventClose: true
    }).then(r => {
      this.$router.push('/login')
    })
  }
}
