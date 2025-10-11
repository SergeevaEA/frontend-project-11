import uniqueId from 'lodash/uniqueId.js'

export default (state, dom, url) => {
  // Массив URL, которые уже используются
  const urls = state.data.feeds.map(feed => feed.url)
  if (!urls.includes(url)) {
    // Фиды
    const feedId = uniqueId('')
    const title = dom.querySelector('title').textContent.trim()
    const description = dom.querySelector('description').textContent.trim()
    state.data.feeds.push({ feedId, url, title, description })

    // Получаем все <item>
    const items = dom.querySelectorAll('item')
    // Преобразуем NodeList в массив и извлекаем нужные поля
    Array.from(items).forEach((item) => {
      const postId = uniqueId('')
      const title = item.querySelector('title').textContent.trim()
      const description = item.querySelector('description').textContent.trim()
      const link = item.querySelector('link').textContent.trim()
      state.data.posts.push({ postId, feedId, title, description, link })
    })
  }
  else {
    const feedId = state.data.feeds.find(feed => feed.url === url).feedId
    // Массив links, которые уже используются
    const links = state.data.posts.map(post => post.link)
    // Получаем все <item>
    const items = dom.querySelectorAll('item')
    // Преобразуем NodeList в массив и извлекаем нужные поля
    Array.from(items).forEach((item) => {
      const link = item.querySelector('link').textContent.trim()
      if (!links.includes(link)) {
        const title = item.querySelector('title').textContent.trim()
        const description = item.querySelector('description').textContent.trim()
        const postId = uniqueId('')
        state.data.posts.push({ postId, feedId, title, description, link })
      }
    })
  }
}
