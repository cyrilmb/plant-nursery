import data from '@/lib/data'
import Link from 'next/link'
import Image from 'next/image'

export default function ProductDetails({
  params,
}: {
  params: { slug: string }
}) {
  const product = data.products.find((x) => x.slug === params.slug)
  if (!product) {
    return <div>Product Not Found</div>
  }
  return (
    <>
      <div className="my-2">
        <Link href="/">Return to Inventory</Link>
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
              <h2 className="text-lg italic">{product.sci_name}</h2>
            </li>
            <li>
              <p>Sun Exposure: {product.sun_exposure}</p>
              <p>Soil Moisture: {product.soil_moisture}</p>
              <p>Height: {product.height}</p>
              <p>Bloom Time: {product.bloom_time}</p>
              <p>Bloom Color: {product.bloom_color}</p>
            </li>
            <li>{product.description}</li>
          </ul>
        </div>
      </div>
    </>
  )
}
