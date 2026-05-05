import { Metadata } from "next"

import InteractiveLink from "@modules/common/components/interactive-link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)] px-4 text-center">
      <h1 className="text-2xl-semi text-ui-fg-base">
        Упс! Страница не найдена
      </h1>
      <p className="text-small-regular text-ui-fg-base max-w-[400px]">
        Похоже, страница, которую вы ищете, была перемещена или никогда не
        существовала. Не переживайте, вы всегда можете вернуться к покупкам.
      </p>
      <InteractiveLink href="/">Вернуться на главную</InteractiveLink>
    </div>
  )
}
