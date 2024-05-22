import { describe, it, expect } from 'vitest'

import { validateBcAcDate } from './validate-bc-ac-date'

describe('Function: validateBcAcDate', () => {
  it('should be able to validate if the date is valid, being B.C.', async () => {
    const date = '0470-01-01T00:00:00Z B.C.'

    const result = validateBcAcDate(date)

    expect(result).toBeTruthy()
  })

  it('should be able to validate if the date is valid, being A.C.', async () => {
    const date = '1970-01-01T00:00:00Z A.C.'

    const result = validateBcAcDate(date)

    expect(result).toBeTruthy()
  })

  it('should not be able to validate if the date is valid without space', async () => {
    const date = '1970-01-01T00:00:00ZA.C.'

    const result = validateBcAcDate(date)

    expect(result).toBeFalsy()
  })

  it('should be able to validate if the date is valid without B.C. or A.C.', async () => {
    const date = '1970-01-01T00:00:00Z'

    const result = validateBcAcDate(date)

    expect(result).toBeTruthy()
  })
})
