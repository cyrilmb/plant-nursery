import React from 'react'
import { useFormContext, ValidationRule } from 'react-hook-form'
import { ShippingAddress } from '@/lib/models/OrderModel'

interface FormInputProps {
  id: keyof ShippingAddress
  name: string
  required?: boolean
  pattern?: ValidationRule<RegExp>
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  required,
  pattern,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ShippingAddress>()

  return (
    <div className="mb-2">
      <label htmlFor={id} className="label">
        {name}
      </label>
      <input
        type="text"
        id={id}
        {...register(id, {
          required: required && `${name} is required`,
          pattern,
        })}
        className="input input-bordered w-full max-w-sm"
      />
      {errors[id]?.message && (
        <div className="text-error">{errors[id]?.message}</div>
      )}
    </div>
  )
}

export default FormInput
