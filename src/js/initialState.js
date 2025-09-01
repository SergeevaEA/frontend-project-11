const initialState = {
  feeds: [], // список новостных лент (добавленных URL)
  process: {
    processState: 'filling', // filling, pushing
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
