"use client"

import { ChevronDown } from "lucide-react"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "created_at",
    label: "сперва новые",
  },
  {
    value: "price_asc",
    label: "сначала дешевле",
  },
  {
    value: "price_desc",
    label: "сначала дороже",
  },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQueryParams("sortBy", e.target.value as SortOptions)
  }

  return (
    <div className="relative flex items-center">
      <select
        value={sortBy}
        onChange={handleChange}
        className="appearance-none bg-transparent pr-5 py-1 text-[11px] lowercase tracking-wider text-[#333] cursor-pointer outline-none hover:opacity-50 transition-opacity"
        data-testid={dataTestId}
      >
        {sortOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-black"
          >
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={12}
        className="absolute right-0 pointer-events-none text-[#333]"
      />
    </div>
  )
}

export default SortProducts
