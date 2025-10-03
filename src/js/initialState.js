const initialState = {
  data: {
    feeds: [], // список новостных лент (добавленных URL) [{id: 1, url: '', title: Title1, description: Description1}, {id: 2, url: '', title: Title2, description: description2}]
    posts: [], // посты в новостных лентах [{id: 1, feedId: 2, postName: ''}, {id: 2, feedId: 1, postName: ''}]
  },
  process: {
    processState: 'filling', // filling, pushing
    errors: {}, // ошибки данных, сетевые ошибки
  },
  form: {
    valid: true, // валидна ли форма
    errors: {}, // ошибки валидации
    fields: {
      url: '', // текстовое поле для URL
    },
    fieldsUI: {
      touched: {
        url: false, // был ли пользовательский ввод
      },
    },
  },
}

export default initialState
