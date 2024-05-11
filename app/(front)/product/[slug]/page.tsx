import data from '@/lib/data'
import Link from 'next/link'
import Image from 'next/image'
import AddToCart from '@/components/products/AddToCart'
import productService from '@/lib/services/productService'
import { convertDocToObj } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const product = await productService.getBySlug(params.slug)
  if (!product) {
    return { title: 'Product Not Found' }
  }
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductDetails({
  params,
}: {
  params: { slug: string }
}) {
  const product = await productService.getBySlug(params.slug)
  if (!product) {
    return <div>Product Not Found</div>
  }
  // const x = 2
  // let y = 4
  // function update(arg: number) {
  //   return Math.random() + y * arg
  // }
  // y = 2

  // const result = update(x)
  // console.log('result: ', result)

  return (
    <>
      <div className="my-2">
        <Link href="/">&#8592; Return to Inventory</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          ></Image>
        </div>
        <div>
          <ul className="space-y-4">
            <li>
              <h1 className="text-xl">{product.name}</h1>
              <h2 className="text-lg italic">{product.sciName}</h2>
            </li>
            <li>
              <p>Sun Exposure: {product.sunExposure}</p>
              <p>Soil Moisture: {product.soilMoisture}</p>
              <p>Height: {product.height}</p>
              <p>Bloom Time: {product.bloomTime}</p>
              <p>Bloom Color: {product.bloomColor}</p>
            </li>
            <li>{product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card bg-base-300 shadow-xl mt-3 md:mt-0">
            <div className="card-body">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Availability </div>
                <div>
                  <p className="italic">
                    {/* typescript error for product.countInStock was popping up here (but not below?) and this fixed it */}
                    {product.countInStock !== undefined &&
                    product.countInStock > 0
                      ? 'In Stock'
                      : 'currently unavailable'}
                  </p>
                </div>
              </div>
              {product.countInStock !== 0 && (
                <div>
                  <AddToCart
                    item={{
                      ...convertDocToObj(product),
                      qty: 0,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
