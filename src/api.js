// All communication with the REST API (JSON Server) is in this file.
const API_URL = 'http://localhost:3030'

// One helper function used by every request
async function request(path, method = 'GET', body) {
  const response = await fetch(API_URL + path, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()

  // response.ok is true for status codes 200-299
  if (!response.ok) {
    throw new Error(typeof data === 'string' ? data : 'Something went wrong')
  }

  return data
}

// ---------- Parts ----------
export const getParts = () => request('/parts?_sort=id&_order=desc')
export const getPart = (id) => request(`/parts/${id}`)
