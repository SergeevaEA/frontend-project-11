import * as yup from 'yup'

const schema = yup.string().url('url').required('required')
const validate = (url, feeds) => {
  return schema.validate(url)
    .then(() => {
      if (feeds.includes(url)) {
        return Promise.reject(new yup.ValidationError('duplicate'))
      }
      return true
    })
}

export default validate
