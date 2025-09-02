import elements from './elements.js'
import { i18nInstance } from './application.js'

const render = (path, value) => {
  if (path === 'form.valid') {
    elements.fields.url.classList.toggle('is-invalid', !value)
  }

  if (path === 'form.errors.url') {
    elements.feedback.textContent = value ? i18nInstance.t(`feedback.errors.${value}`) : ''
  }
}

export default render
