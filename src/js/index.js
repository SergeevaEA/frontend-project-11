// Import our custom CSS
import '../css/styles.scss'

// Import all of Bootstrap's JS
// import * as bootstrap from 'bootstrap'

import * as yup from 'yup'
import onChange from 'on-change'
import isEmpty from 'lodash/isEmpty.js'

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

const render = (elements, initialState) => {
  if (!initialState.form.valid) {
    elements.fields.url.classList.add('invalid')
  }
  else {
    elements.fields.url.classList.remove('invalid')
  }
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
      processState: 'filling', // filling, pushing
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

  const state = onChange(initialState, render())
  elements.fields.url.addEventListener('input', (e) => {
    state.process.processState = 'filling'
    const { value } = e.target
    state.form.fields.url = value
    state.form.fieldsUI.touched.url = true
    const errors = validate()
    errors.catch(error => state.form.errors = error)
    state.form.valid = isEmpty(state.form.errors)
  })

  elements.submitButton.addEventListener('submit', (e) => {
    e.preventDefault()

    state.process.processState = 'pushing'

    const url = state.form.fields.url
    if (state.form.valid) {
      state.feeds.push(url)
    }
  })
}
