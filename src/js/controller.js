import onChange from 'on-change'

import initialState from './initialState.js'
import render from './render.js'
import validate from './validate.js'
import elements from './elements.js'
import getData from './getData.js'
import parseData from './parseData.js'
import uniqueId from 'lodash/uniqueId.js'

export default () => {
  const state = onChange(initialState, (path, value) => render(path, value, state)) // (initialState, render)
  elements.fields.url.addEventListener('input', (e) => {
    state.process.processState = 'filling'
    const { value } = e.target
    state.form.fields.url = value
    state.form.fieldsUI.touched.url = true
    validate(state.form.fields.url, state.data)
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
      const id = uniqueId('')
      getData(url)
        .then(data => parseData(data))
        .then((dom) => {
          const title = dom.querySelector('title').textContent.trim()
          const description = dom.querySelector('description').textContent.trim()
          state.data.feeds.push({ id, url, title, description })
          state.form.fields.url = ''
          state.process.processState = 'filling'
        })
        .catch((error) => {
          state.process.errors.dataError = error.message
          state.process.processState = 'filling'
        })
    }
  })
}
