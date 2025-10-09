import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import SearchBar from "@modules/common/components/search-bar"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
  searchQuery,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  searchQuery?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container gap-6"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="mb-8">
          <div className="mb-6">
            <SearchBar className="max-w-md" />
          </div>
          <div className="text-2xl-semi">
            <h1 data-testid="store-page-title" className="text-blue-900">
              {searchQuery ? `Search results for "${searchQuery}"` : "All products"}
            </h1>
          </div>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            searchQuery={searchQuery}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
