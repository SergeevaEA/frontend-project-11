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
              // Фиды
              const feedId = uniqueId('')
              const title = dom.querySelector('title').textContent.trim()
              const description = dom.querySelector('description').textContent.trim()
              state.data.feeds.push({ feedId, url, title, description })

              // Получаем все <item>
              const items = dom.querySelectorAll('item')
              // Преобразуем NodeList в массив и извлекаем нужные поля
              Array.from(items).map((item) => {
                const postId = uniqueId('')
                const title = item.querySelector('title').textContent.trim()
                const description = item.querySelector('description').textContent.trim()
                const link = item.querySelector('link').textContent.trim()
                state.data.posts.push({ postId, feedId, title, description, link })
              })

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
