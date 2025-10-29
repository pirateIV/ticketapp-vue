export class TicketService {
  static ticketKey = "ticketapp_tickets"

  static addTicket(ticket) {
    const tickets = this.getTickets()
    const userId = ticket.user

    if (!tickets[userId]) {
      tickets[userId] = []
    }

    tickets[userId].push(ticket)
    this.saveTickets(tickets)
  }

  static editTicket(ticketId, updatedTicket) {
    const tickets = this.getTickets()
    let ticketFound = false

    for (const userId in tickets) {
      const userTickets = tickets[userId]
      const ticketIndex = userTickets.findIndex((t) => t.id === ticketId)

      if (ticketIndex !== -1) {
        userTickets[ticketIndex] = {
          ...userTickets[ticketIndex],
          ...updatedTicket,
          updatedAt: new Date().toISOString(),
        }
        ticketFound = true
        break
      }
    }

    if (ticketFound) {
      this.saveTickets(tickets)
    }

    return ticketFound
  }

  static deleteTicket(ticketId) {
    const tickets = this.getTickets()
    let ticketFound = false

    for (const userId in tickets) {
      const originalLength = tickets[userId].length
      tickets[userId] = tickets[userId].filter((t) => t.id !== ticketId)
      if (tickets[userId].length < originalLength) {
        ticketFound = true
      }
    }

    if (ticketFound) {
      this.saveTickets(tickets)
    }

    return ticketFound
  }

  static getTickets() {
    try {
      const tickets = localStorage.getItem(this.ticketKey)
      return tickets ? JSON.parse(tickets) : {}
    } catch (error) {
      console.error("Error loading tickets:", error)
      return {}
    }
  }

  static getTicketsByUser(userId) {
    const tickets = this.getTickets()
    return tickets[userId] || []
  }

  static getTicketById(ticketId) {
    const tickets = this.getTickets()

    for (const userId in tickets) {
      const ticket = tickets[userId].find((t) => t.id === ticketId)
      if (ticket) {
        return ticket
      }
    }

    return null
  }

  static saveTickets(tickets) {
    try {
      localStorage.setItem(this.ticketKey, JSON.stringify(tickets))
    } catch (error) {
      console.error("Error saving tickets:", error)
    }
  }

  static getAllTicketsFlat() {
    const tickets = this.getTickets()
    const allTickets = []

    for (const userId in tickets) {
      allTickets.push(...tickets[userId])
    }

    return allTickets
  }
}
