import { clamp, stringToColor } from '@/lib/utils'

describe('utils.clamp', () => {
    it('Return value is within bounds', () => {
        const min = 0
        const max = 10
        const value = 11
        const result = clamp(min, max, value)
        expect(result).toBeLessThanOrEqual(max)
        expect(result).toBeGreaterThanOrEqual(min)
    })
})

test('utils.stringColor returns a valid color if param is an empty string', () => {
    // should return a hex color, which is 7 characters long
    expect(stringToColor('').length).toBe(7)
})
