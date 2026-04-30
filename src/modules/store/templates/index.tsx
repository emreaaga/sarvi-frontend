import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { Suspense } from "react"
import FilterBar from "../components/filter-bar"
import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({ sortBy, page, countryCode }: any) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="flex flex-col content-container">
      <FilterBar sort={sort} />
      <div className="w-full mt-4">
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
export default StoreTemplate
