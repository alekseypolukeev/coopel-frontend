import {makeFetchApi, makeAuthenticate, makeAxiosClient, makeFetchPublicApi, makeFetch} from '../axios'

const baseUrl = process.env.API_HOST
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

export default ({ Vue, store }) => {
  const axiosClient = makeAxiosClient(baseUrl, clientId, clientSecret, store)

  const authenticate = makeAuthenticate(axiosClient, clientId, clientSecret)
  const fetchApi = makeFetchApi(axiosClient, store)
  const fetchPublicApi = makeFetchPublicApi(axiosClient)
  const fetch = makeFetch(axiosClient)

  Vue.prototype.$axios = {
    authenticate,
    fetchApi,
    fetchPublicApi,
    fetch
  }
}
