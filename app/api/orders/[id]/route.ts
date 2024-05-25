import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModel";

//dynamic folder structure to get id by params from url
//wrap api in auth to check user authorization
//return all order info to front end
export const GET = auth(async (...request: any) => {
    const [req, {params}] = request
    if (!req.auth) {
        return Response.json(
            {message: 'unauthorized'},
            {status: 401}
        )
    }
    await dbConnect()
    const order = await OrderModel.findById(params.id)
    return Response.json(order)
})