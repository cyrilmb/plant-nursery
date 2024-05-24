import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import OrderModel, { OrderItem } from "@/lib/models/OrderModel";
import ProductModel from "@/lib/models/ProductModel";
import { round2Decimal } from "@/lib/utils";

const calcPrices = (orderItems: OrderItem[]) => {
    const itemsPrice = round2Decimal(
        orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
    const taxPrice = round2Decimal(Number((0.09025 * itemsPrice).toFixed(2)))
    const totalPrice = round2Decimal(itemsPrice + taxPrice)
    return {itemsPrice, taxPrice, totalPrice}
}

export const POST = auth(async (req: any) => {
//check user auth
    if (!req.auth) {
        return Response.json(
            {message: 'unauthorized'},
        {status: 401})
    }
    const {user} = req.auth
    //Create order
    try {
        const payload = await req.json()
        await dbConnect()
        //get price from db, so not potentially manipulated in client
        const dbProductPrices = await ProductModel.find(
            {
                _id: {$in: payload.items.map((x: {_id: string}) => x._id)},
            },
            'price'
        )
        
        //update prices of selected items to match prices from database
        const dbOrderItems = payload.items.map((x: {_id: string}) => ({
            ...x,
            //add id to order model
            product: x._id,
            price: dbProductPrices.find((x) => x._id === x._id).price,
            //remove id from dbOrderItems
            _id: undefined
        }))

        const {itemsPrice, taxPrice, totalPrice} = calcPrices(dbOrderItems)

        const newOrder = new OrderModel({
            items: dbOrderItems,
            itemsPrice,
            taxPrice,
            totalPrice,
            shippingAddress: payload.shippingAddress,
            paymentMethod: payload.paymentMethod,
            user: user._id,
        })

        const createdOrder = await newOrder.save()
        return Response.json(
            {message: 'Order has been created', order: createdOrder},
            {status: 201}
        )
    } catch (error: any) {
        return Response.json(
            {message: error.message},
            {status: 500}
        )
    }
})