import { ref } from "vue"
import { Validator } from "../utils/validator"

export function useForm(formSchema: any, initialData: any = {}) {
  const formData = ref({ ...initialData })
  const errors = ref<any>({})
  const touched = ref<any>({})
  const validator = new Validator()

  const validateField = (fieldName: string, value: any) => {
    if (!formSchema[fieldName]) return { isValid: true, errors: [] }

    const result = validator.validateField(fieldName, formSchema[fieldName], value, formData.value)

    errors.value = {
      ...errors.value,
      [fieldName]: result.errors,
    }

    return result
  }

  const validateForm = () => {
    const result = validator.validateForm(formData.value, formSchema)

    const newErrors: any = {}
    Object.entries(result.results).forEach(([fieldName, fieldResult]: [string, any]) => {
      newErrors[fieldName] = fieldResult.errors
    })

    errors.value = newErrors
    return result
  }

  const setFieldValue = (fieldName: string, value: any) => {
    formData.value = { ...formData.value, [fieldName]: value }

    if (touched.value[fieldName]) {
      setTimeout(() => validateField(fieldName, value), 0)
    }
  }

  const setFieldTouched = (fieldName: string) => {
    touched.value = { ...touched.value, [fieldName]: true }
    setTimeout(() => validateField(fieldName, formData.value[fieldName]), 0)
  }

  const handleChange = (fieldName: string) => (event: any) => {
    const value = event.target.value
    setFieldValue(fieldName, value)
  }

  const handleBlur = (fieldName: string) => () => {
    setFieldTouched(fieldName)
  }

  const getFieldProps = (fieldName: string) => ({
    value: formData.value[fieldName] || "",
    error: errors.value[fieldName]?.[0] || "",
    onChange: handleChange(fieldName),
    onBlur: handleBlur(fieldName),
  })

  const resetForm = () => {
    formData.value = { ...initialData }
    errors.value = {}
    touched.value = {}
  }

  return {
    formData,
    errors,
    touched,
    setFieldValue,
    validateField,
    validateForm,
    getFieldProps,
    resetForm,
  }
}
