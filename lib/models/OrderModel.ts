export type OrderItem = {
    name: string
    slug: string
    qty: number
    image: string
    price: number
}

export type ShippingAddress = {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
}