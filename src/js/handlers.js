import elements from './elements.js'

export default (state) => {
  elements.postsElement.addEventListener('click', (e) => {
    const postId = e.target.dataset.id
    const post = state.data.posts.find(post => post.postId === postId)

    // помечаем пост как прочитанный
    post.isRead = true

    // если клик на кнопку "Просмотр"
    if (e.target.tagName === 'BUTTON') {
      const modalTitle = document.querySelector('.modal-title')
      const modalBody = document.querySelector('.modal-body')
      const fullArticle = document.querySelector('.full-article')

      modalTitle.textContent = post.title
      modalBody.textContent = post.description
      fullArticle.setAttribute('href', post.link)
    }
  })
}
