import elements from './elements.js'
import { i18nInstance } from './application.js'

const render = (path, value, state) => {
  if (path === 'form.valid') {
    elements.fields.url.classList.toggle('is-invalid', !value)
  }

  if (path === 'form.errors.url') {
    elements.feedback.textContent = value ? i18nInstance.t(`feedback.errors.${value}`) : ''
  }

  if (path === 'form.process.errors') {
    elements.feedback.textContent = value ? i18nInstance.t(`feedback.errors.${value}`) : ''
  }

  if (path === 'process.processState') {
    handleProcessState(elements, value)
  }

  const feeds = state.data.feeds
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
    </div>
  `
  }
}

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

export default render
