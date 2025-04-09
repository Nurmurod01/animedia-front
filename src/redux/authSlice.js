import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Async thunks for authentication
export const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // For demo purposes, we'll simulate an API call

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check credentials against mock data
    // In a real app, this would be handled by your backend
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

      return { user }
    }

    return rejectWithValue("Invalid email or password")
  } catch (error) {
    return rejectWithValue(error.message || "Login failed")
  }
})

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate an API call

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

      return { user }
    } catch (error) {
      return rejectWithValue(error.message || "Registration failed")
    }
  },
)

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
  try {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))

    if (token && user) {
      // In a real app, you would validate the token with your backend
      return { user }
    }

    return rejectWithValue("Not authenticated")
  } catch (error) {
    return rejectWithValue(error.message || "Authentication check failed")
  }
})

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer

