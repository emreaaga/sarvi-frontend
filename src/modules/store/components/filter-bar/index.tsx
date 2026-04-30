import { listCategories } from "@lib/data/categories"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { Search } from "lucide-react"
import CategorySelect from "../category-select"

const FilterBar = async ({ sort }: { sort: SortOptions }) => {
  const categories = await listCategories().catch(() => [])

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between py-6 mb-2 text-[11px] lowercase tracking-[0.1em] text-[#333] font-sans">
      <div className="flex items-center gap-x-10">
        <CategorySelect categories={categories} />
        <button className="uppercase text-[10px] tracking-widest font-normal hover:text-black transition-colors">
          бренд
        </button>
        <button className="uppercase text-[10px] tracking-widest font-normal hover:text-black transition-colors">
          цена
        </button>
      </div>

      <div className="flex items-center gap-x-10 mt-4 md:mt-0">
        <div className="flex items-center gap-x-2 text-gray-400 hover:text-black cursor-pointer uppercase text-[10px] tracking-widest">
          <span>Поиск</span>
          <Search size={14} strokeWidth={1.5} />
        </div>

        <div className="flex items-center gap-x-3">
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
