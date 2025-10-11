import onChange from 'on-change'

import initialState from './initialState.js'
import render from './render.js'
import validate from './validate.js'
import elements from './elements.js'
import getData from './getData.js'
import parseData from './parseData.js'
import updateDataInState from './updateDataInState.js'
import checkEvery5Seconds from './checkEvery5Seconds.js'
import handlers from './handlers.js'

export default () => {
  const state = onChange(initialState, (path, value) => render(path, value, state)) // (initialState, render)
  handlers(state)
  checkEvery5Seconds(state)

  elements.fields.url.addEventListener('input', (e) => {
    state.process.processState = 'filling'
    const { value } = e.target
    state.form.fields.url = value
    state.form.fieldsUI.touched.url = true
  })

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault()

    state.process.processState = 'pushing'
    state.process.success = false

    // Валидация
    validate(state.form.fields.url, state.data)
      .then(() => {
        state.form.errors.url = null
        state.form.valid = true

        // Если валидация прошла - загружаем данные
        const url = state.form.fields.url
        if (state.form.valid) {
          getData(url)
            .then(data => parseData(data))
            .then((dom) => {
              updateDataInState(state, dom, url)

              state.form.fields.url = ''
              state.process.errors.dataError = null
              state.process.success = true
              state.process.processState = 'filling'
            })
            .catch((error) => {
              // Ошибка сети или парсинга
              state.process.errors.dataError = error.message
              state.process.processState = 'filling'
            })
        }
      })
      .catch((error) => {
        // Ошибка валидации
        state.form.errors.url = error.message
        state.form.valid = false
        state.process.processState = 'filling'
      })
  })
}
