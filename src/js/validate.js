import * as yup from 'yup'

const schema = yup.string().url('Ссылка должна быть валидным URL').required('Ссылка должна быть валидным URL')
const validate = (url, feeds) => {
  return schema.validate(url)
    .then(() => {
      if (feeds.includes(url)) {
        return Promise.reject(new yup.ValidationError('Такой URL уже существует'))
      }
      return true
    })
}

export default validate
