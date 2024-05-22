export function validateBcAcDate(date: string): boolean {
  const [fullDateWithoutBcAc] = date.split(' ')

  const parsedDate = new Date(fullDateWithoutBcAc)

  const isParsedDateValid =
    parsedDate instanceof Date && !isNaN(parsedDate.getTime())

  return isParsedDateValid
}
