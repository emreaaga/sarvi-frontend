import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { Metadata } from "next"

async function getDictionary(locale: string) {
  const code = locale || "ru-RU"
  try {
    const dict = await import(`../../../../lib/constants/${code}.json`)
    return dict.default
  } catch {
    const fallback = await import(`../../../../../lib/constants/ru-RU.json`)
    return fallback.default
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return {
    title: dict.store?.meta_title,
    description: dict.store?.meta_description,
  }
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    type_id?: string
  }>
  params: Promise<{
    countryCode: string
    locale: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams

  const { sortBy, page, type_id } = searchParams
  const { countryCode, locale } = params

  return (
    <main className="w-full bg-white">
      <StoreTemplate
        sortBy={sortBy}
        page={page}
        countryCode={countryCode}
        typeId={type_id}
        locale={locale}
      />
    </main>
  )
}
