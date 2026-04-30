import { HttpTypes } from "@medusajs/types"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import FilterBar from "@modules/store/components/filter-bar"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  return (
    <div
      className="flex flex-col content-container font-sans"
      data-testid="category-container"
    >
      <FilterBar sort={sort} />

      <div className="w-full">
        <div className="flex flex-col mb-6">
          <h1
            className="uppercase text-[24px] font-bold tracking-tight text-black"
            data-testid="category-page-title"
          >
            {category.name}
          </h1>
          {category.description && (
            <p className="text-[12px] text-gray-500 mt-2 max-w-[600px] leading-relaxed">
              {category.description}
            </p>
          )}
        </div>

        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? 8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
