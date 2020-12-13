const key = 'hmtt-74-token'
export function setToken (token) {
  localStorage.setItem(key, token)
}
export function getToken () {
  return localStorage.getItem(key)
}
export function removeToken () {
  localStorage.removeItem(key)
}
