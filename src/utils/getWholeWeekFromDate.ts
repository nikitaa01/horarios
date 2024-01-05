const getMondayOfWeekFromDate = (date: Date) => {
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(date.setDate(diff))
}

const getWholeWeekFromDate = (date: Date) => {
  const dateCopy = new Date(date)
  const startDay = getMondayOfWeekFromDate(dateCopy)
  const week = []
  for (let i = 0; i < 7; i++) {
    week.push(new Date(startDay).toLocaleDateString('es'))
    startDay.setDate(startDay.getDate() + 1)
  }
  return week
}

export default getWholeWeekFromDate