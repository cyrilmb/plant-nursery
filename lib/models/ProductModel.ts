import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        name : {type: String, required: true},
        slug : {type: String, required: true, unique: true},
        image : {type: String, required: true},
        price : {type: Number, required: true},
        sciName : {type: String, required: true},
        description : {type: String, required: true},
        sunExposure : {type: String, required: true},
        soilMoisture : {type: String, required: true},
        height : {type: String, required: true},
        bloomTime : {type: String, required: true},
        bloomColor : {type: String, required: true},
        countInStock : {type: Number, required: true, default: 0},
        banner: String
}, 
{
    //records time of creation and last update recorded
    timestamps: true
}
)

const ProductModel = 
    mongoose.models.Product || mongoose.model('Product', productSchema)

    export default ProductModel

export type Product = {
    _id?: string
    name: string
    slug: string
    image: string
    banner?: string
    price: number
    sciName: string
    description: string
    sunExposure: string
    soilMoisture: string
    height: string
    bloomTime: string
    bloomColor: string
    countInStock?: number
 }