import { createContext, useState } from 'react'

// Holds the logged-in user so every component can read it with useContext
export const AuthContext = createContext(null)

const ONE_HOUR = 60 * 60 * 1000 // the json-server-auth token is valid for 1 hour

// Reads the saved login from localStorage (if it is not expired)
function getSavedAuth() {
  const saved = JSON.parse(localStorage.getItem('auth'))
  if (saved && Date.now() < saved.expiresAt) {
    return saved
  }
  localStorage.removeItem('auth')
  return null
}

// Wraps the whole app (in main.jsx) and shares the login data with all components
function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getSavedAuth())

  // Called after a successful login or register
  const saveAuth = (data) => {
    const authData = { ...data, expiresAt: Date.now() + ONE_HOUR }
    localStorage.setItem('auth', JSON.stringify(authData))
    setAuth(authData)
  }

  const logout = () => {
    localStorage.removeItem('auth')
    setAuth(null)
  }

  // Everything inside "value" is available to all components
  const value = {
    user: auth ? auth.user : null,
    saveAuth: saveAuth,
    logout: logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
