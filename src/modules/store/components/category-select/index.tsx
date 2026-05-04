"use client"

import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

const CategorySelect = ({ categories }: { categories: any[] }) => {
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === "all") {
      router.push("/store")
    } else {
      router.push(`/categories/${value}`)
    }
  }

  return (
    <div className="relative flex items-center group">
      <select
        onChange={handleChange}
        defaultValue=""
        className="appearance-none bg-transparent pr-5 py-1 text-[10px] uppercase tracking-widest text-[#333] cursor-pointer outline-none font-bold hover:text-black transition-colors"
      >
        <option value="" disabled>
          категория
        </option>
        <option value="all">все товары</option>
        {categories.map((c) => (
          <option key={c.id} value={c.handle}>
            {c.name}
          </option>
        ))}
      </select>

      <ChevronDown
        size={12}
        strokeWidth={2}
        className="absolute right-0 pointer-events-none text-gray-400 group-hover:text-black transition-colors"
      />
    </div>
  )
}

export default CategorySelect
