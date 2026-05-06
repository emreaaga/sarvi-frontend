import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductSlider from "../product-slider"

export default async function ProductRail({
  collection,
  region,
  dict,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
  dict: any
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts || pricedProducts.length === 0) return null

  return (
    <div className="content-container py-8 md:py-16">
      <ProductSlider
        products={pricedProducts}
        region={region}
        title={collection.title}
        handle={collection.handle}
        dict={dict}
      />
    </div>
  )
}
