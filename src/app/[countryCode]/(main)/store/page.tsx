import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Каталог | SARVI Cosmetics",
  description:
    "Исследуйте нашу коллекцию селективной косметики и нишевой парфюмерии.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { sortBy, page } = searchParams

  return (
    <main className="w-full bg-white">
      <StoreTemplate
        sortBy={sortBy}
        page={page}
        countryCode={params.countryCode}
      />
    </main>
  )
}
