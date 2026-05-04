import { listCategories, listProductTypes } from "@lib/data/categories"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { Search, X } from "lucide-react"
import Link from "next/link"
import CategorySelect from "../category-select"
import TypeSelect from "../type-select"

const FilterBar = async ({
  sort,
  typeId,
  categoryId,
  disabledTypeSelect,
}: {
  sort: SortOptions
  typeId?: string
  categoryId?: string
  disabledTypeSelect?: boolean
}) => {
  const [categories, types] = await Promise.all([
    listCategories().catch(() => []),
    listProductTypes().catch(() => []),
  ])

  const hasFilters = typeId || categoryId

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between py-4 mb-4 border-b border-gray-100 text-[11px] lowercase tracking-[0.1em] text-[#333] font-sans">
      {/* Левая часть: Фильтры */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <CategorySelect categories={categories} />

        {/* Передаем пропсы в TypeSelect */}
        <TypeSelect
          types={types}
          disabled={disabledTypeSelect}
          value={typeId}
        />

        {/* Кнопка сброса появляется, только если есть фильтры И мы не на странице конкретного бренда */}
        {hasFilters && !disabledTypeSelect && (
          <Link
            href="/store"
            className="flex items-center gap-x-1 text-red-400 hover:text-red-600 transition-colors uppercase text-[9px] font-bold"
          >
            <span>сбросить</span>
            <X size={10} />
          </Link>
        )}
      </div>

      {/* Правая часть: Поиск и Сортировка */}
      <div className="flex items-center gap-x-8 mt-6 md:mt-0">
        <button className="flex items-center gap-x-2 text-gray-400 hover:text-black transition-colors uppercase text-[10px] tracking-widest">
          <span>Поиск</span>
          <Search size={14} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-x-3 border-l pl-8 border-gray-200">
          <span className="text-gray-400 uppercase text-[10px] tracking-widest">
            Порядок:
          </span>
          <RefinementList sortBy={sort} />
        </div>
      </div>
    </div>
  )
}

export default FilterBar
