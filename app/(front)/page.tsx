/* eslint-disable @next/next/no-img-element */
import ProductItem from '@/components/products/ProductItem'
import data from '@/lib/data'
import productService from '@/lib/services/productService'
import { Metadata } from 'next'
import Link from 'next/link'

export const medadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Prairie Burn Nursery',
  description:
    process.env.NEXT_PUBLIC_APP_DESC || 'Minnesota native wildflower nursery',
}

export default async function Home() {
  const featuredProducts = await productService.getFeatured()
  const latestProducts = await productService.getLatest()
  return (
    <>
      <div className="w-full carousel rounded-box mt-4">
        {featuredProducts.map((product, i) => (
          <div
            key={product._id}
            id={`slide-${i}`}
            className="carousel-item relative w-full"
          >
            <Link href={`/product/${product.slug}`}>
              <img src={product.banner} alt={product.name} className="w-full" />
            </Link>
            <div className="absolute flex justify-between transform-translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide-${i === 0 ? featuredProducts.length - 1 : i - 1}`}
                className="btn btn-circle"
              >
                {/* ❮ */}
                &#10094;
              </a>
              <a
                href={`#slide-${i === 0 ? featuredProducts.length - 1 : i + 1}`}
                className="btn btn-circle"
              >
                {/* ❯ */}
                &#10095;
              </a>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-2xl py-2">Available Seedling Inventory</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}
      </div>
    </>
  )
}
