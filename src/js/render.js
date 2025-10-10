import elements from './elements.js'
import { i18nInstance } from './application.js'

const handleProcessState = (elements, processState) => {
  switch (processState) {
    case 'filling':
      elements.submitButton.disabled = false
      elements.fields.url.focus()
      break

    case 'pushing':
      elements.submitButton.disabled = true
      break

    default:
      throw new Error(`Unknown process state: {processState}`)
  }
}

const render = (path, value, state) => {
  if (path === 'form.valid') {
    elements.fields.url.classList.toggle('is-invalid', !value)
  }

  if ((path === 'form.errors.url') && (state.process.processState === 'pushing')) {
    elements.feedback.classList.remove('text-success')
    elements.feedback.classList.add('text-danger')
    elements.feedback.textContent = value ? i18nInstance.t(`feedback.errors.${value}`) : ''
  }

  if (path === 'process.errors.dataError') {
    elements.feedback.classList.remove('text-success')
    elements.feedback.classList.add('text-danger')
    elements.feedback.textContent = value ? i18nInstance.t(`feedback.errors.${value}`) : ''
  }

  if (path === 'process.processState') {
    handleProcessState(elements, value)
  }

  if ((path === 'process.success') && (value === true)) {
    elements.fields.url.value = ''
    elements.feedback.classList.remove('text-danger')
    elements.feedback.classList.add('text-success')
    elements.feedback.textContent = i18nInstance.t(`feedback.success`)
  }

  const feeds = state.data.feeds
  const posts = state.data.posts
  console.log(state)

  if (feeds.length > 0) {
    const feedsData = feeds.map((feed) => {
      return `<li class="list-group-item border-0 border-end-0">
        <h3 class="h6 m-0">${feed.title}</h3>
        <p class="m-0 small text-black-50">${feed.description}</p>
      </li>`
    })

    elements.feedsElement.innerHTML = `
    <div class="card border-0">
      <div class="card-body">
        <h2 class="card-title h4">Фиды</h2>
      </div>
      <ul class="list-group border-0 rounded-0">${feedsData.join('')}</ul>
    </div>`

    if (posts.length > 0) {
      const postsData = posts.map((post) => {
        return `<li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
                <a href=${post.link} class="fw-bold" data-id="40" target="_blank" rel="noopener noreferrer">${post.title}</a>
                <button type="button" class="btn btn-outline-primary btn-sm" data-id="40" data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button>
              </li>`
      })

      elements.postsElement.innerHTML = `
        <div class="card border-0">
          <div class="card-body">
            <h2 class="card-title h4">Посты</h2>
          </div>
          <ul class="list-group border-0 rounded-0">${postsData.join('')}</ul>
        </div>`
    }
  }
}

export default render
