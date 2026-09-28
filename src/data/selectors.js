export const findCoach = (data, id) => data.coaches.find((item) => item.id === id)
export const findPlan = (data, id) => data.plans.find((item) => item.id === id)
export const findMemberByEmail = (data, email) => data.members.find((item) => item.email.toLowerCase() === email?.toLowerCase())
export const bookingCount = (data, session) => session.booked + data.bookings.filter((item) => item.sessionId === session.id).length
export const formatDate = (value) => value ? new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`)) : '—'
