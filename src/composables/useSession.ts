import { ref, computed, onMounted } from "vue"
import { SessionService } from "../services/session"

const user = ref<any>(null)
const loading = ref(true)
const error = ref("")

export function useSession() {
  onMounted(() => {
    const token = localStorage.getItem(SessionService.sessionKey)
    if (token) {
      const userData = SessionService.verifyToken(token)
      if (userData) {
        user.value = userData
      }
    }
    loading.value = false
  })

  const isAuthenticated = computed(() => SessionService.isAuthenticated())

  const signup = async (userCredentials: any) => {
    return await SessionService.signup(userCredentials)
  }

  const login = async (userCredentials: any) => {
    return await SessionService.login(userCredentials)
  }

  const logout = () => {
    SessionService.logout()
    window.location.href = "/"
    error.value = ""
  }

  const setUser = (newUser: any) => {
    user.value = newUser
  }

  const setError = (newError: string) => {
    error.value = newError
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    signup,
    login,
    logout,
    setUser,
    setError,
  }
}
