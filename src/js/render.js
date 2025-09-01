import elements from './elements.js'

const render = (path, value) => {
  if (path === 'form.valid') {
    elements.fields.url.classList.toggle('is-invalid', !value)
  }
}

export default render
