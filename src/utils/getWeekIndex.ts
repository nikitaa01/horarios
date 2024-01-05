function getWeekIndex(fecha: Date) {
  const monthStart = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay()
  const adjustedMonthStart = (monthStart === 0 ? 7 : monthStart)
  const weekIndex = Math.ceil((fecha.getDate() + adjustedMonthStart - 1) / 7)
  return weekIndex
}

export default getWeekIndex