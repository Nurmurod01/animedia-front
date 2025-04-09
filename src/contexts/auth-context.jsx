"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
}

// Auth reducer
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
      return {
        ...state,
        loading: true,
        error: null,
      }
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      }
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      }
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      }
    case "AUTH_CHECK_COMPLETE":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        loading: false,
      }
    default:
      return state
  }
}

// Create context
const AuthContext = createContext(null)

// Auth provider
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem("token")
        const user = JSON.parse(localStorage.getItem("user"))

        if (token && user) {
          // In a real app, you would validate the token with your backend
          dispatch({
            type: "AUTH_CHECK_COMPLETE",
            payload: { isAuthenticated: true, user },
          })
        } else {
          dispatch({
            type: "AUTH_CHECK_COMPLETE",
            payload: { isAuthenticated: false, user: null },
          })
        }
      } catch (error) {
        dispatch({
          type: "AUTH_CHECK_COMPLETE",
          payload: { isAuthenticated: false, user: null },
        })
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email, password) => {
    dispatch({ type: "LOGIN_START" })

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Check credentials against mock data
      if (email === "john@example.com" && password === "password") {
        const user = {
          id: 1,
          username: "john_doe",
          email: "john@example.com",
          role: "user",
          image: null,
        }

        // Store token in localStorage
        localStorage.setItem("token", "mock_jwt_token")
        localStorage.setItem("user", JSON.stringify(user))

        dispatch({ type: "LOGIN_SUCCESS", payload: user })
        return { success: true }
      }

      dispatch({ type: "LOGIN_FAILURE", payload: "Invalid email or password" })
      return { success: false, error: "Invalid email or password" }
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.message || "Login failed",
      })
      return { success: false, error: error.message || "Login failed" }
    }
  }

  // Register function
  const register = async (username, email, password) => {
    dispatch({ type: "REGISTER_START" })

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Simulate successful registration
      const user = {
        id: 2, // New user ID
        username,
        email,
        role: "user",
        image: null,
      }

      // Store token in localStorage
      localStorage.setItem("token", "mock_jwt_token")
      localStorage.setItem("user", JSON.stringify(user))

      dispatch({ type: "REGISTER_SUCCESS", payload: user })
      return { success: true }
    } catch (error) {
      dispatch({
        type: "REGISTER_FAILURE",
        payload: error.message || "Registration failed",
      })
      return { success: false, error: error.message || "Registration failed" }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    dispatch({ type: "LOGOUT" })
  }

  // Clear error
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

