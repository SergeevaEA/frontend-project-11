import elements from './elements.js'
import controller from './controller.js'

import i18n from 'i18next'
import ru from './locales/ru.js'

export const i18nInstance = i18n.createInstance()

export default () => {
  window.addEventListener('DOMContentLoaded', () => {
    elements.fields.url.focus() // ставим фокус после того, как DOM загружен
  })

  i18nInstance
    .init({
      lng: 'ru',
      debug: true,
      resources: {
        ru,
      },
    })
    .then(() => {
      controller()
    })
}
