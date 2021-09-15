import { useState, useCallback, useMemo } from 'react'
import useCalculator from 'hooks/useCalculator'
import Key from 'components/Key'
import { NUMBER_AND_ACTION_KEYS, RESULT_KEYS } from 'utils/constants/listOfKeys'
import { RESET, NUMBER, SUM, RESULT, DELETE, SUBTRACT } from 'utils/constants/listOfTypes'
import { deleteLastCharacter, getNumberOfTextView } from 'utils/strings';
import './Calculator.css'

export default function Calculator() {
  const [currentNumber, setCurrentNumber] = useState('')
  const [lastOperation, setLastOperation] = useState('')

  const { addOperation, result, removeOperationType, reset } = useCalculator({ valueToOperate: currentNumber })

  const getCurrentNumberValue = useCallback(() => {
    const value = getNumberOfTextView(currentNumber)
    return value
  }, [currentNumber])

  const updateValuesToView = useCallback((completeResultOfOperation) => {
    if (completeResultOfOperation) {
      let completeResult = completeResultOfOperation
      if (Array.isArray(completeResultOfOperation)) {
        completeResult = completeResultOfOperation[0]
      }
      if (completeResult) {
        const { operationStructure, resultOfOperation } = completeResult
        setLastOperation(operationStructure)
        setCurrentNumber(`${resultOfOperation}`)
      }
    }
  }, [])

  const renderOperation = useCallback(({ value, type }) => {
    const validActions = currentNumber ? [NUMBER, SUM] : [NUMBER];

    if (value && validActions.some(ele => ele === type)) {
      setCurrentNumber((number) => `${number}${value}`)
    }
  }, [currentNumber])

  const LIST_OF_ACTIONS = useMemo(() => ({
    [RESET]: () => {
      setCurrentNumber('')
      setLastOperation('')
      reset()
    },
    [DELETE]: () => {
      setCurrentNumber(prevCurrentNumber => deleteLastCharacter(prevCurrentNumber))
      removeOperationType()
    },
    [SUM]: () => {
      if (currentNumber) {
        const numberValue = getCurrentNumberValue()
        const completeResultOfOperation = addOperation({ value: numberValue, type: SUM })
          updateValuesToView(completeResultOfOperation)
      }
    },
    [SUBTRACT]: () => {
      if (currentNumber) {
        const numberValue = getCurrentNumberValue()
        const completeResultOfOperation = addOperation({ value: numberValue, type: SUBTRACT })
          updateValuesToView(completeResultOfOperation)
      }
    },
    [RESULT]: () => {
      const numberValue = getCurrentNumberValue()
      const completeResult = result(numberValue)
      updateValuesToView(completeResult)
    },
  }), [addOperation, result, currentNumber, getCurrentNumberValue, updateValuesToView, removeOperationType, reset])

  const handleClick = useCallback((operation) => {
    const action = LIST_OF_ACTIONS[operation.type]
    renderOperation(operation)
    if (action) action(operation)
  }, [LIST_OF_ACTIONS, renderOperation])

  const handleChange = useCallback((evt) => {
    setCurrentNumber(evt.target.value)
  }, [])

  return (
    <section className="Calculator">
      <div className="Header">
        <h2>calc</h2>
        <div>
          <p>Theme</p>
        </div>
      </div>
      <div className="Body">
        <form>
          <div className="InputValue">
            <input type="text" className="InputValue__Input" value={lastOperation} disabled />
            <input type="text" className="InputValue__Input" value={currentNumber} onChange={handleChange} />
            
          </div>
          <div className="Keys__Container">
            <div className="Keys">
              {Object.values(NUMBER_AND_ACTION_KEYS).map((keyValues) => (
                <Key key={keyValues.value} {...keyValues} onClick={handleClick} />
              ))}
            </div>
            <div className="Keys__Results">
              {Object.values(RESULT_KEYS).map((keyValues) => (
                <Key key={keyValues.type} {...keyValues} onClick={handleClick} />
              ))}
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
