// Import our custom CSS
import '../css/styles.scss'

// Import all of Bootstrap's JS
// import * as bootstrap from 'bootstrap'

import * as yup from 'yup'
import onChange from 'on-change'
//const schema = yup.string()

/*export default () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    urlInput,
    submitButton,
  }
}*/

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
