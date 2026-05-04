"use client"

import { ChevronDown } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const TypeSelect = ({
  types,
  disabled,
  value,
}: {
  types: any[]
  disabled?: boolean
  value?: string
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentValue = value || searchParams.get("type_id") || ""

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (disabled) return
    const val = e.target.value
    const params = new URLSearchParams(searchParams)

    if (val === "all") {
      params.delete("type_id")
    } else {
      params.set("type_id", val)
    }

    params.set("page", "1") // Сбрасываем на 1 страницу
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={`relative flex items-center ${disabled ? "" : "group"}`}>
      <select
        onChange={handleChange}
        value={currentValue}
        disabled={disabled}
        className={`appearance-none bg-transparent pr-5 py-1 text-[10px] uppercase tracking-widest outline-none font-bold transition-colors ${
          disabled
            ? "text-[#1a1a1a] cursor-default opacity-100" // Стиль для заблокированного (четкий текст)
            : "text-[#333] cursor-pointer hover:text-black"
        }`}
      >
        <option value="" disabled>
          бренд
        </option>
        <option value="all">все бренды</option>
        {types.map((t) => (
          <option key={t.id} value={t.id}>
            {t.value}
          </option>
        ))}
      </select>

      {/* Скрываем стрелочку, если селект заблокирован */}
      {!disabled && (
        <ChevronDown
          size={12}
          className="absolute right-0 pointer-events-none text-gray-400 group-hover:text-black"
        />
      )}
    </div>
  )
}

export default TypeSelect
