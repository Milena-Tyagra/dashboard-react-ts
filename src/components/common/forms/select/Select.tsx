import React from "react"
import Input, { InputProps } from "../input"

interface Option {
  value: string
}

interface SelectProps extends InputProps {
  options: Option[]
  multiple?: boolean
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  errors,
  touched,
  multiple = false
}) => {
  return (
    <Input
      as="select"
      label={label}
      name={name}
      errors={errors}
      touched={touched}
      multiple={multiple}
    >
      <option value="">Selecione uma opção</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.value}
        </option>
      ))}
    </Input>
  )
}

export default Select
