const [todoForm] = document.forms
const todoList = document.getElementById('todo')

const reducer = (list, todo) => `${list}<li id='${todo.id}'><i>X</i>${todo.text}</li>`

const getTodos = () => {
  fetch('/todo', {credentials: 'same-origin'})
    .then(status)
    .then((res) => res.json())
    .then((todo) => {
      const todoItems = todo.reduce(reducer, '')
      todoList.innerHTML = todoItems
    })
}

const addTodos = (todoText) => fetch('/todo/insert', {
  method: 'post',
  headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
  credentials: 'same-origin',
  body: `text=${todoText}`
})

const deleteTodos = (todoId) => fetch('/todo/delete', {
  method: 'delete',
  headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
  credentials: 'same-origin',
  body: `id=${todoId}`
})

getTodos()

todoForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const todoText = event.target.elements.text.value
  addTodos(todoText)
    .then(status)
    .then((res) => res.json())
    .then((todo) => {
      todoList.innerHTML += `<li id='${todo.id}'><i>X</i>${todoText}</li>`
      event.target.elements.text.value = ''
    })
})

todoList.addEventListener('click', (event) => {
  if (event.target.tagName === 'I') {
    const todo = event.target.parentNode
    deleteTodos(todo.id)
      .then(status)
      .then(() => {
        todoList.removeChild(todo)
      })
  }
})
