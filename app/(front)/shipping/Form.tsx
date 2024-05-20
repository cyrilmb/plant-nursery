'use client'

import useCartService from '@/lib/hooks/useCartStore'
import { ShippingAddress } from '@/lib/models/OrderModel'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import CheckoutSteps from '@/components/CheckoutSteps'
import FormInput from './FormInput'

const Form = () => {
  const router = useRouter()
  const { saveShippingAddress, shippingAddress } = useCartService()
  const methods = useForm<ShippingAddress>({
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
  })
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName)
    setValue('address', shippingAddress.address)
    setValue('city', shippingAddress.city)
    setValue('postalCode', shippingAddress.postalCode)
    setValue('country', shippingAddress.country)
  }, [setValue, shippingAddress])

  const formSubmit = async (form: ShippingAddress) => {
    saveShippingAddress(form)
    router.push('/payment')
  }

  return (
    <div>
      <CheckoutSteps current={1} />
      <div className="max-w-sm mx-auto card bg-base-300 my-4">
        <div className="card-body">
          <h1 className="card-title">Shipping Address</h1>
          {/* FormProvider is context API, allows childs to access form methods and state w/out re-rendering */}
          {/* Before I made the FormInput a separate component, it was rerendering with every errors update and losing focus on input fields */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(formSubmit)}>
              <FormInput name="Full Name" id="fullName" required />
              <FormInput name="Address" id="address" required />
              <FormInput name="City" id="city" required />
              <FormInput name="Postal Code" id="postalCode" required />
              <FormInput name="Country" id="country" required />
              <div className="my-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full"
                >
                  {isSubmitting && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Next
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default Form
