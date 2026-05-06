import { getLocale } from "@lib/data/locale-actions"
import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { getDictionary } from "@lib/dictionaries"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 15

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  type_id?: string[]
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  typeId,
  productsIds,
  countryCode,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  typeId?: string
  productsIds?: string[]
  countryCode: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 15,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  if (typeId) {
    queryParams["type_id"] = [typeId]
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const locale = await getLocale()
  const dict = await getDictionary(locale || "ru-RU")

  let {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-5 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} dict={dict.product} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
