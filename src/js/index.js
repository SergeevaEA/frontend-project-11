// Import our custom CSS
import '../css/styles.scss'

// Import all of Bootstrap's JS
// import * as bootstrap from 'bootstrap'

import * as yup from 'yup'
import onChange from 'on-change'

const schema = yup.string().url('Ссылка должна быть валидным URL').required('Ссылка должна быть валидным URL')
const isURLValid = (url, feeds) => {
  return schema.validate(url)
    .then(() => {
      if (feeds.includes(url)) {
        return Promise.reject(new yup.ValidationError('Такой URL уже существует'))
      }
    })
    .catch(error => console.log(error.message))
}

export default () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    fields: {
      url: document.getElementById('url-input'),
    },
    submitButton: document.querySelector('input[type="submit"]'),
  }

  const initialState = {
    feeds: [], // список новостных лент (добавленных URL)
    process: {
      processState: 'filling', // filling, sending, sent, error
      processError: null, // ошибки при отправке
    },
    form: {
      valid: true, // валидна ли форма
      errors: {}, // ошибки валидации
      fields: {
        url: '', // текстовое поле для URL
      },
      fieldsUI: {
        touched: {
          url: false, // был ли пользовательский ввод
        },
      },
    },
  }
}
