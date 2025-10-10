import * as yup from 'yup'

const schema = yup.string().url('url')
const validate = (url, data) => {
  return schema.validate(url)
    .then(() => {
      const urls = data.feeds.map(feed => feed.url)
      if (urls.includes(url)) {
        return Promise.reject(new yup.ValidationError('duplicate'))
      }
      return true
    })
}

export default validate
