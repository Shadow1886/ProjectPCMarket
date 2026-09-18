// All communication with the REST API (JSON Server) is in this file.
const API_URL = 'http://localhost:3030'

// One helper function used by every request
async function request(path, method = 'GET', body) {
  const headers = { 'Content-Type': 'application/json' }

  // If the user is logged in, send the token so the server knows who we are
  const auth = JSON.parse(localStorage.getItem('auth'))
  if (auth) {
    headers.Authorization = `Bearer ${auth.accessToken}`
  }

  const response = await fetch(API_URL + path, {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()

  // response.ok is true for status codes 200-299
  if (response.status === 401) {
    throw new Error('Please log in again.') // no token or the token has expired
  }
  if (response.status === 403) {
    throw new Error('You are not allowed to do this.') // e.g. editing someone else's part
  }
  if (!response.ok) {
    throw new Error(typeof data === 'string' ? data : 'Something went wrong')
  }

  return data
}

// ---------- Authentication ----------
// Both return { accessToken, user }
export const login = (email, password) => request('/login', 'POST', { email, password })
export const register = (username, email, password) =>
  request('/register', 'POST', { username, email, password })

// ---------- Parts ----------
export const getParts = () => request('/parts?_sort=id&_order=desc')
export const getPart = (id) => request(`/parts/${id}`)
export const createPart = (part) => request('/parts', 'POST', part)
export const updatePart = (id, part) => request(`/parts/${id}`, 'PATCH', part)
export const deletePart = (id) => request(`/parts/${id}`, 'DELETE')
