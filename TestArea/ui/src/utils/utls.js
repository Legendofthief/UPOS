import { useState } from 'react'

export const useInput = (Value) => {
  const [value, setValue] = useState(Value)

  const onChange = event => {
    setValue(event.target.value)
  }

  const clear = () => setValue('')

  return {
    bind: {value, onChange},
    value,
  clear}
}
