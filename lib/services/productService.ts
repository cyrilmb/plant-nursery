import {cache} from 'react'
import dbConnect from '../dbConnect';
import ProductModel, {Product} from '../models/ProductModel';


//cache value updates at most every hour
export const revalidate = 3600

//Cache prevents multiple database hits, caches db query result
const getInventory = cache(async () => {
    await dbConnect()
    const products = await ProductModel.find({})
    //sort by id descending, so latest product first
    .sort({_id: -1})
    //limit to first 4 documents in product collection
    .limit(4)
    //convert to plain JS object
    .lean()
    return products as Product[]
})

//return only featured products
const getFeatured = cache(async () => {
    await dbConnect()
    const products = await ProductModel.find({ isFeatured: true })
    //limit to first 4 documents in product collection
    .limit(3)
    //convert to plain JS object
    .lean()
    return products as Product[]
})

//find single product by slug
const getBySlug = cache(async (slug: string) => {
    await dbConnect()
    const product = await ProductModel.findOne({ slug }).lean()
    return product as Product
})

const productService = {
    getInventory,
    getFeatured,
    getBySlug
}
export default productService

