import { NUMBER, DELETE, SUM, SUBTRACT, MULTIPLY, DIVIDE, RESET, RESULT } from './listOfTypes'

export const NUMBER_AND_ACTION_KEYS = {
  SEVEN: {
    value: 7,
    type: NUMBER
  },
  EIGHT: {
    value: 8,
    type: NUMBER
  },
  NINE: {
    value: 9,
    type: NUMBER
  },
  DELETE: {
    value: 'DEL',
    type: DELETE
  },
  FOUR: {
    value: 4,
    type: NUMBER
  },
  FIVE: {
    value: 5,
    type: NUMBER
  },
  SIX: {
    value: 6,
    type: NUMBER
  },
  SUM: {
    value: '+',
    type: SUM
  },
  ONE: {
    value: 1,
    type: NUMBER
  },
  TWO: {
    value: 2,
    type: NUMBER
  },
  THREE: {
    value: 3,
    type: NUMBER
  },
  SUBTRACT: {
    value: '-',
    type: SUBTRACT
  },
  POINT: {
    value: '.',
    type: NUMBER
  },
  CERO: {
    value: 0,
  },
  DIVIDE: {
    value: '/',
    type: DIVIDE
  },
  MULTIPLY: {
    value: 'x',
    type: MULTIPLY
  },
}

export const RESULT_KEYS = {
  RESET: {
    value: 'RESET',
    type: RESET
  },
  RESULT: {
    value: '=',
    type: RESULT
  }
}

export const LIST_OF_KEYS = {
  ...NUMBER_AND_ACTION_KEYS,
  ...RESULT_KEYS
}