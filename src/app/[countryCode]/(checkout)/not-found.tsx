import InteractiveLink from "@modules/common/components/interactive-link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 | Страница не найдена",
  description: "Запрашиваемая страница не существует",
}

export default async function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center font-sans px-4">
      <h1 className="text-[24px] uppercase tracking-[0.2em] font-bold text-black mb-4">
        страница не найдена
      </h1>
      <p className="text-[12px] uppercase tracking-widest text-gray-500 mb-8 max-w-sm leading-relaxed">
        извините, но запрашиваемая страница не существует или была перенесена.
      </p>
      <InteractiveLink href="/">на главную</InteractiveLink>
    </div>
  )
}
