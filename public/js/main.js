const status = (response) => {
  if (response.ok) {
    return Promise.resolve(response)
  }
  return Promise.reject(response)
}
