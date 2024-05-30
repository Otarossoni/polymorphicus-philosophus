/** @description Generates a random date in the year 2002 */
export function generateRandomDate(): Date {
  return new Date(
    2002, // Year => 2002
    Math.floor(Math.random() * 11), // Some month between 1 and 12
    Math.floor(Math.random() * 27), // Sometime between 1 and 28
    Math.floor(Math.random() * 23), // Some hour between 1 and 24
    Math.floor(Math.random() * 59), // Some minute between 1 and 59
    Math.floor(Math.random() * 59), // Some second between 1 and 59
    Math.floor(Math.random() * 998), // Some millisecond between 1 and 999
  )
}
