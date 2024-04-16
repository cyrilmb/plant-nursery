import { create } from "zustand";
import { round2Decimal } from "../utils";
import { OrderItem } from "../models/OrderModel";
import { persist } from "zustand/middleware";

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

export const cartStore = create<Cart>()(
    persist(() => initialState, {
        name: 'cartStore',
    })
)

const calcPrice = (items: OrderItem[]) => {
    const itemsPrice = round2Decimal(
        //reduce method takes an arr and calls callback fxn (multiply two values)
        //and return accumulated results. acc initial value set to 0
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
        //return extracted terms so components using this hook can access current
        //cart state w/out needing to access store
        items,
        itemsPrice,
        taxPrice,
        totalPrice,
        //update items in cart and prices
        increase: (item: OrderItem) => {
            //find item based on slug, put in exist
            const exist = items.find((x) => x.slug === item.slug)
            const updatedCartItems = exist 
                ? items.map((x) => 
                    x.slug === item.slug ? {...exist, qty: exist.qty + 1 } : x
                ) 
            : [...items, {...item, qty: 1 }]
            //update items and prices based on updated values
            const { itemsPrice, taxPrice, totalPrice } = 
                calcPrice(updatedCartItems)
                cartStore.setState({
                    items: updatedCartItems,
                    itemsPrice,
                    taxPrice,
                    totalPrice
                })
        },
        decrease: (item: OrderItem) => {
            const exist = items.find(
            (x) => 
                x.slug === item.slug        
            )
            // if not exist then don't change state
            if (!exist) return
            const updatedCartItems = 
            exist.qty === 1 
                ? items.filter((x: OrderItem) => x.slug !== item.slug)
                : items.map((x) => 
                    x.slug === item.slug
                        ? { ...exist, qty: exist.qty - 1 }
                        : x
                )
            //update items and prices based on updated values
                const { itemsPrice, taxPrice, totalPrice } = 
                calcPrice(updatedCartItems)
                cartStore.setState({
                    items: updatedCartItems,
                    itemsPrice,
                    taxPrice,
                    totalPrice
                })
        },
    }
}