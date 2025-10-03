import axios from 'axios'

export default (url) => {
  return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then(response => response.data.contents)
    .catch(() => {
      throw new Error('networkError')
    })
}
