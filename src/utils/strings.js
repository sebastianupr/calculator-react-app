import { NUMBER_AND_ACTION_KEYS } from './constants/listOfKeys'

const { SUM, SUBTRACT } = NUMBER_AND_ACTION_KEYS

export const getNumberOfTextView = (string) => {
  const allNumbers = string.replaceAll(`${SUM.value} ${SUBTRACT.value}`, ' ').split(' ')
  console.log('allNumbers', allNumbers)
  const number = allNumbers[allNumbers.length - 1]
  return Number(number)
}

export const deleteLastCharacter = (string) => string.slice(0, -1);