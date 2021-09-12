import { useState, useCallback, useMemo } from 'react'
import { add, subtract } from 'utils/math';
import { SUM, SUBTRACT } from 'utils/constants/listOfTypes';
import { LIST_OF_KEYS } from 'utils/constants/listOfKeys';

export default function useCalculator() {
  const [currentOperation, setCurrentOperation] = useState({ value: '', type: null })
  const [operationsHistory, setOperationsHistory] = useState([])

  const LIST_OF_OPERATIONS = useMemo(() => ({
    [SUM]: add,
    [SUBTRACT]: subtract,
  }), [])

  const result = useCallback((lastNumberValue) => {
    try {
      if (currentOperation.value) {
        const { value, type } = currentOperation
        const operation = LIST_OF_OPERATIONS[type]
        console.log('lastNumberValue', lastNumberValue)
        const resultOfOperation = operation(value, lastNumberValue)

        setCurrentOperation({ value: '', type: null })

        const operationStructure = `${value}${LIST_OF_KEYS[type].value}${lastNumberValue}`

        const completeResultOfOperation = {
          operationStructure,
          resultOfOperation,
          operationValues: [
            { value, type },
            { value: lastNumberValue, type: null }
          ]
        }
        setOperationsHistory(prevOperationsHistory => prevOperationsHistory.concat(completeResultOfOperation))

        console.log('completeResultOfOperation', completeResultOfOperation)
        return completeResultOfOperation
      }
    } catch (error) {
      console.error(error)
      return false
    }
  }, [currentOperation, LIST_OF_OPERATIONS])

  const addOperation = useCallback((operation) => {
    if (currentOperation.value && currentOperation.type) {
      const completeResultOfOperation = result(operation.value)
      return [completeResultOfOperation, operation]
    } else {
      setCurrentOperation(operation)
    }
  }, [currentOperation, result])

  const removeOperationType = useCallback(() => {
    setCurrentOperation((prevCurrentOperation) => ({ ...prevCurrentOperation, type: null }))
  }, [])

  const reset = useCallback(() => {
    setCurrentOperation({ value: '', type: null })
    setOperationsHistory([])
  }, [])

  const helpers = {
    setCurrentOperation, addOperation, result, removeOperationType, reset
  }

  return { currentOperation, operationsHistory, ...helpers }
}