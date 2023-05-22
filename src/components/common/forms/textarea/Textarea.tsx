import React from "react"
import Input, { InputProps } from "../input"
import styles from "./Textarea.module.css"

interface TextareaProps extends InputProps {}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  errors,
  touched,
}) => {
  return (
      <Input
        as="textarea"
        label={label}
        name={name}
        errors={errors}
        touched={touched}
        className={styles.textarea}
      />
  )
}

export default Textarea
