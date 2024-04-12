import { create } from "zustand";
import { round2Decimal } from "../utils";
import { OrderItem } from "../models/OrderModel";

type Cart = {
    items: OrderItem[]
    itemsPrice: number
    taxPrice: number
    totalPrice: number
}

const initialState: Cart = {
    items: [],
    itemsPrice: 0,
    taxPrice: 0,
    totalPrice: 0
}

export const cartStore = create<Cart>(() => initialState)

const calcPrice = (items: OrderItem[]) => {
    const itemsPrice = round2Decimal(
        items.reduce((acc, item) => acc = item.price * item.qty, 0)
    ),
    taxPrice = round2Decimal(Number(0.0685 * itemsPrice)),
    totalPrice = round2Decimal(itemsPrice + taxPrice)
    return { itemsPrice, taxPrice, totalPrice }
}

export default function useCartService() {
    //extract terms from cartStore
    const {items, itemsPrice, taxPrice, totalPrice} = cartStore()
    return {
        items, 
        itemsPrice,
        taxPrice,
        totalPrice,
        //update items in cart and prices
        increase: (item: OrderItem) => {
            const exist = items.find((x) => x.slug === item.slug)
            const updatedCartItems = exist 
                ? items.map((x) => 
                    x.slug === item.slug ? {...exist, qty: exist.qty + 1 } : x
                ) 
            : [...items, {...item, qty: 1 }]
            const { itemsPrice, taxPrice, totalPrice } = 
                calcPrice(updatedCartItems)
        }
    }
}