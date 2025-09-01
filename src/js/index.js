import '../css/styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import onChange from 'on-change'

import initialState from './initialState.js'
import render from './render.js'
import validate from './validate.js'
import elements from './elements.js'

window.addEventListener('DOMContentLoaded', () => {
  elements.fields.url.focus() // ставим фокус после того, как DOM загружен
})

export default () => {
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
