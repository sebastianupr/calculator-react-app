import { useMemo, useCallback } from 'react'
import { LIST_OF_KEYS } from './../../utils/constants/listOfKeys'
import './Key.css'

const getKeyClassNames = (type = '') => {
  let classNameByAction = ''

  if (type === LIST_OF_KEYS.DELETE.type) {
    classNameByAction = 'Key__Especial-action'
  }

  if (type === LIST_OF_KEYS.RESET.type) {
    classNameByAction = 'Key__Especial-action--big'
  }

  if (type === LIST_OF_KEYS.RESULT.type) {
    classNameByAction = 'Key__Result--big'
  }

  return  `Key ${classNameByAction}`
}

export default function Key({ value = '', type = '', onClick }) {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick({ value, type })
    }
  }, [onClick, value, type])

  const keyClassName = useMemo(() => getKeyClassNames(type), [type])
  return (
    <div className={keyClassName} tabIndex="0" role="button" onClick={handleClick} onKeyPress={handleClick}>
      <p>{value}</p>
    </div>
  )
}
