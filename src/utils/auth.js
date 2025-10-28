export const generateId = () => {
  return "id_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36)
}

export const hashPassword = async (password) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + "ticket-app-salt")
  const hash = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}
