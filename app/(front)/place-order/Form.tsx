'use client'

import useCartService from '@/lib/hooks/useCartStore'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'

const Form = () => {
  const router = useRouter()
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    totalPrice,
    clear,
  } = useCartService()

  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    //useSWRMutation is a hook to mutate data in the backend
    //new order gets added to this api
    `/api/orders/mine`,
    async (url) => {
      //this api is the api/orders/route.ts file
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items,
          itemsPrice,
          taxPrice,
          totalPrice,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        //clear the cart if the order was successful
        clear()
        toast.success('Your order has been placed!')
        return router.push(`/order/${data.order._id}`)
      } else {
        toast.error(data.message)
      }
    }
  )
}

export default Form
