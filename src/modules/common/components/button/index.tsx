import { clx } from "@medusajs/ui"
import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  isLoading?: boolean
}

const Button = ({
  variant = "primary",
  className,
  isLoading,
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      "bg-[#262626] text-white border-transparent hover:bg-black active:bg-neutral-800",
    secondary:
      "bg-white border-[#E5E5E5] text-[#262626] hover:bg-gray-50 active:bg-gray-100",
  }

  return (
    <button
      {...props}
      className={clx(
        "flex items-center justify-center px-4 h-12 md:h-10 w-full",
        "uppercase text-[12px] md:text-[10px] font-bold tracking-[0.1em]",
        "border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        "active:scale-[0.98] select-none",
        variants[variant],
        className
      )}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
