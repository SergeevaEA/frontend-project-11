import axios from 'axios'
import parseData from './parseData.js'
import updateDataInState from './updateDataInState.js'

const checkEvery5Seconds = (state) => {
  // Массив URL
  const urls = state.data.feeds.map(feed => feed.url)

  // Создаем массив промисов для всех запросов
  const requests = urls.map((url) => {
    return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
      .then(response => response.data.contents)
      .catch((err) => {
        console.error(`Ошибка сети для ${url}:`, err)
        return null // Чтобы Promise.all не падал из-за ошибки в обработке какой-то одной ссылки
      })
  })

  // Ждем завершения всех запросов
  Promise.all(requests)
    .then((contentsArray) => {
      contentsArray.forEach((content, index) => {
        if (content === null) return // пропускаем фиды, обработанные с ошибкой
        // парсим RSS и добавляем новые посты
        const dom = parseData(content)
        const url = urls[index]
        updateDataInState(state, dom, url)
      })
    })
    .finally(() => {
      // Повторяем проверку через 5 секунд
      setTimeout(checkEvery5Seconds, 5000, state)
    })
}

export default checkEvery5Seconds
