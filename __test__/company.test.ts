import company from '../src/modules/company'
import { map, each } from 'lodash'

test('new company model', () => {
  const model = new company('Workbean', 20, 3)
  expect(model.name).toBe('Workbean');
  expect(typeof model.id).toBe('string')
  expect(model.id).toBeDefined()
  expect(model.allocateLeaves).toBe(3)
  expect(model.allocateOvertime).toBe(20)
})

test('company overtime', () => {
  const model = new company('Workbean', 20, 3)
  expect(model.getComputedOvertime(20)).toBe(0)
  expect(model.getComputedOvertime(20)).toEqual(0)
  expect(model.getComputedOvertime(18)).toBeGreaterThan(0)
  expect(model.getComputedOvertime(22)).toBeLessThan(0)
})

test('company list', () => {
  const testOvertime = 3
  const listing = [
    ['Workbean', 10, 3, 7],
    ['Lemondrop', 5, 2, 2],
  ]
  const models = map(listing, (data) => new company(data[0] as string, data[1] as number, data[2] as number))

  each(listing, (data, index) => {
    expect(models[index].name).toBe(data[0])
    expect(models[index].allocateOvertime).toBe(data[1])
    expect(models[index].allocateLeaves).toBe(data[2])
    expect(models[index].getComputedOvertime(testOvertime)).toEqual(data[3])
  })

})