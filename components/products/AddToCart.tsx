'use client'

import useCartService from '@/lib/hooks/useCartStore'
import { OrderItem } from '@/lib/models/OrderModel'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AddToCart({ item }: { item: OrderItem }) {
  const router = useRouter()
  const { items, increase } = useCartService()
  const [existItem, setExistItem] = useState<OrderItem | undefined>()

  useEffect(() => {
    //if item slug from cart matches the item in items array, set to existItem
    setExistItem(items.find((x) => x.slug === item.slug))
  }, [item, items])

  //pass item prop from AddToCart to increase from useCartService, adds one of the item
  const addToCartHandler = () => {
    increase(item)
  }

  //check if item exists, if yes show -/+ qty, if not show add to cart button
  return existItem ? (
    <div>
      <button className="btn" type="button">
        -
      </button>
      <span className="px-2">{existItem.qty}</span>
      <button className="btn" type="button" onClick={() => increase(existItem)}>
        +
      </button>
    </div>
  ) : (
    <button
      className="btn btn-primary w-full"
      type="button"
      onClick={addToCartHandler}
    >
      Add To Cart
    </button>
  )
}
