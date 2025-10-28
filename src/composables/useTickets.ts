import { ref, onMounted } from "vue"
import { TicketService } from "../services/tickets"
import { useSession } from "./useSession"

export function useTickets() {
  const { user } = useSession()
  const tickets = ref<any>({})
  const isLoading = ref(true)

  const loadTickets = () => {
    const savedTickets = TicketService.getTickets()
    tickets.value = savedTickets
    isLoading.value = false
  }

  onMounted(() => {
    loadTickets()
  })

  const addTicket = (ticket: any) => {
    const newTicket = {
      ...ticket,
      id: `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      user: user.value.id,
      createdAt: new Date().toISOString(),
    }

    TicketService.addTicket(newTicket)

    const updatedTickets = { ...tickets.value }
    const userId = newTicket.user

    if (!updatedTickets[userId]) {
      updatedTickets[userId] = []
    }

    updatedTickets[userId].push(newTicket)
    tickets.value = updatedTickets

    return {
      success: true,
      ticket: newTicket,
      message: "Ticket created successfully",
    }
  }

  const editTicket = (ticketId: string, updatedTicket: any) => {
    const ticketToUpdate = {
      ...updatedTicket,
      updatedAt: new Date().toISOString(),
    }

    const success = TicketService.editTicket(ticketId, ticketToUpdate)

    if (success) {
      const updatedTickets = { ...tickets.value }

      for (const userId in updatedTickets) {
        const ticketIndex = updatedTickets[userId].findIndex((ticket: any) => ticket.id === ticketId)

        if (ticketIndex !== -1) {
          updatedTickets[userId][ticketIndex] = {
            ...updatedTickets[userId][ticketIndex],
            ...ticketToUpdate,
          }
          break
        }
      }

      tickets.value = updatedTickets
    }

    return {
      success,
      message: success ? "Ticket updated successfully" : "Ticket not found",
    }
  }

  const deleteTicket = (ticketId: string) => {
    const success = TicketService.deleteTicket(ticketId)

    if (success) {
      const updatedTickets = { ...tickets.value }

      for (const userId in updatedTickets) {
        updatedTickets[userId] = updatedTickets[userId].filter((ticket: any) => ticket.id !== ticketId)
      }

      tickets.value = updatedTickets
    }

    return {
      success,
      message: success ? "Ticket deleted successfully" : "Ticket not found",
    }
  }

  const getUserTickets = () => {
    if (!user.value?.id) return []
    return tickets.value[user.value.id] || []
  }

  const getUserTicketStats = () => {
    const userTickets = getUserTickets()
    return {
      total: userTickets.length,
      open: userTickets.filter((t: any) => t.status === "open").length,
      in_progress: userTickets.filter((t: any) => t.status === "in_progress").length,
      closed: userTickets.filter((t: any) => t.status === "closed").length,
    }
  }

  return {
    tickets,
    isLoading,
    addTicket,
    editTicket,
    deleteTicket,
    loadTickets,
    getUserTickets,
    getUserTicketStats,
  }
}
