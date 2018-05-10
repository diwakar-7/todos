const [todoForm] = document.forms
const todoList = document.getElementById('todo')

const reducer = (list, todo) => `
  ${list}<li>
    <input class="text" type="text" value="${todo.text}" id='${todo.id}' readonly>
    <b class='edit'>I</b>
    <b class='del'>X</b>
  </li>`

const getTodo = () => {
  fetch('/todo', {credentials: 'same-origin'})
    .then(status)
    .then((res) => res.json())
    .then((todo) => {
      const todoItems = todo.reduce(reducer, '')
      todoList.innerHTML = todoItems
    })
}

const addTodo = (todoText) => fetch('/todo/insert', {
  method: 'post',
  headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
  credentials: 'same-origin',
  body: `text=${todoText}`
})

const updateTodo = (todoText, todoId) => fetch('/todo/update', {
  method: 'put',
  headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
  credentials: 'same-origin',
  body: `text=${todoText}&todoId=${todoId}`
})

const deleteTodo = (todoId) => fetch('/todo/delete', {
  method: 'delete',
  headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
  credentials: 'same-origin',
  body: `id=${todoId}`
})

getTodo()

todoForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const todoText = event.target.elements.text.value
  addTodo(todoText)
    .then(status)
    .then((res) => res.json())
    .then((todo) => {
      todoList.innerHTML += `
        <li>
          <input class="text" type="text" value="${todoText}" id='${todo.id}' readonly>
          <b class='edit'>I</b>
          <b class='del'>X</b>
        </li>`
      event.target.elements.text.value = ''
    })
})

todoList.addEventListener('click', (event) => {
  const todo = event.target.parentNode.firstElementChild
  if (event.target.classList.contains('del')) {
    deleteTodo(todo.id)
      .then(status)
      .then(() => {
        todoList.removeChild(todo.parentNode)
      })
  } else if (event.target.classList.contains('edit')) {
    todoFocus(todo)
  }
})

const todoFocus = (todo) => {
  todo.removeAttribute('readonly')
  todo.focus()
  todo.selectionStart = todo.value.length
  todo.selectionEnd = todo.value.length
  todo.addEventListener('blur', todoBlur)
}

const todoBlur = (event) => {
  const todo = event.target
  todo.setAttribute('readonly', '')
  todo.removeEventListener('blur', blur)
  updateTodo(todo.value, todo.id)
}
