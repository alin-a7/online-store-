/**
 * @jest-environment jsdom
 */

import { sum } from "../components/cartArr/cartArr"

describe('When given 2 numbers', () => {
    it('returns the sum of those 2 numbers', () => {
      const result = sum(10, 5)
      const expected = 15
  
      expect(result).toEqual(expected)
    })
  })
