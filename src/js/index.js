import '../css/styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import * as yup from 'yup'
import onChange from 'on-change'

const elements = {
  form: document.querySelector('.rss-form'),
  fields: {
    url: document.getElementById('url-input'),
  },
  submitButton: document.querySelector('input[type="submit"]'),
}

window.addEventListener('DOMContentLoaded', () => {
  elements.fields.url.focus() // ставим фокус после того, как DOM загружен
})

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

const render = (path, value) => {
  if (path === 'form.valid') {
    elements.fields.url.classList.toggle('is-invalid', !value)
  }
}

export default () => {
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

  const state = onChange(initialState, render)
  elements.fields.url.addEventListener('input', (e) => {
    state.process.processState = 'filling'
    const { value } = e.target
    state.form.fields.url = value
    state.form.fieldsUI.touched.url = true
    validate(state.form.fields.url, state.feeds)
      .then(() => {
        state.form.errors.url = null
        state.form.valid = true
      })
      .catch((error) => {
        state.form.errors.url = error.message
        state.form.valid = false
      })
  })

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault()

    state.process.processState = 'pushing'

    const url = state.form.fields.url
    if (state.form.valid) {
      state.feeds.push(url)
      state.form.fields.url = ''
      elements.fields.url.focus()
    }
  })
}
