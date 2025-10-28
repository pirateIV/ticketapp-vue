import { generateId, hashPassword } from "../utils/auth"

export class SessionService {
  static sessionKey = "ticketapp_session"
  static usersKey = "ticketapp_users"

  static async signup(userCredentials) {
    const existingUsers = this.getUsers()
    const existingUser = existingUsers.find(
      (user) => user.email === userCredentials.email || user.username === userCredentials.username,
    )

    if (existingUser) {
      return {
        message: "User already exists",
        success: false,
      }
    }

    const { username, email, password } = userCredentials

    const newUser = {
      id: generateId(),
      username,
      email,
      password: await hashPassword(password),
      createdAt: new Date().toISOString(),
    }

    existingUsers.push(newUser)
    localStorage.setItem(this.usersKey, JSON.stringify(existingUsers))

    return {
      message: "User created successfully",
      success: true,
    }
  }

  static async login(userCredentials) {
    const users = this.getUsers()
    const { email, password } = userCredentials
    const user = users.find((u) => u.email === email)

    if (!user) {
      return {
        message: "User not found",
        success: false,
      }
    }

    const hashedPassword = await hashPassword(password)
    const isPasswordMatch = user.password === hashedPassword

    if (!isPasswordMatch) {
      return {
        message: "Invalid credentials",
        success: false,
      }
    }

    const token = this.generateToken({ email: user.email, id: user.id })
    localStorage.setItem(this.sessionKey, token)

    return { user, success: true }
  }

  static generateToken(user) {
    const header = btoa(JSON.stringify({ alg: "HS256", type: "JWT" }))
    const payload = btoa(
      JSON.stringify({
        ...user,
        exp: Date.now() + 24 * 60 * 60 * 1000,
      }),
    )
    const signature = btoa(this.sessionKey)
    return `${header}.${payload}.${signature}`
  }

  static verifyToken(token) {
    try {
      const [, payload] = token.split(".")
      const userData = JSON.parse(atob(payload))

      if (userData.exp < Date.now()) {
        this.logout()
        return null
      }

      return userData
    } catch {
      return null
    }
  }

  static isAuthenticated() {
    const token = localStorage.getItem(this.sessionKey)
    return token && this.verifyToken(token)
  }

  static logout() {
    localStorage.removeItem(this.sessionKey)
  }

  static getUsers() {
    const ticketAppUsers = localStorage.getItem(this.usersKey)
    return ticketAppUsers ? JSON.parse(ticketAppUsers) : []
  }

  static getCurrentUser(id) {
    const user = localStorage.getItem(this.usersKey)
    return user ? JSON.parse(user).find((u) => u.id === id) : null
  }
}
