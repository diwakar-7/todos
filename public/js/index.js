const Form = function Form (form) {
  this.error = form.querySelector('.error')
  this.button = form.querySelector('button')
  form.addEventListener('submit', this.submit.bind(this))
}

Form.prototype.submit = function submit (event) {
  event.preventDefault()
  this.error.classList.remove('visible')
  this.button.disabled = true

  const username = event.target.elements.username.value
  const password = event.target.elements.password.value

  fetch(event.target.action, {
    method: 'post',
    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    credentials: 'same-origin',
    body: `username=${username}&password=${password}`
  })
    .then(status)
    .then(() => location.reload('/'))
    .catch((err) => {
      this.error.innerHTML = err.statusText
      this.error.classList.add('visible')
    })
    .then(() => {
      this.button.disabled = false
    })
}

new Form(document.getElementById('signin'))
new Form(document.getElementById('signup'))
