"use client"

import { ArrowLeft, ArrowRight } from "@medusajs/icons" // Если иконки установлены, иначе можно просто < или >
import { clx } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function Pagination({
  page,
  totalPages,
  "data-testid": dataTestid,
}: {
  page: number
  totalPages: number
  "data-testid"?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const arrayRange = (start: number, stop: number) =>
    Array.from({ length: stop - start + 1 }, (_, index) => start + index)

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // Общие стили для кнопок
  const buttonBaseClass =
    "flex items-center justify-center w-10 h-10 rounded-md border transition-all duration-200 text-small-regular"

  const renderPageButton = (
    p: number,
    label: string | number,
    isCurrent: boolean
  ) => (
    <button
      key={p}
      className={clx(buttonBaseClass, {
        "bg-ui-bg-base border-ui-border-strong text-ui-fg-base font-semibold shadow-sm":
          isCurrent,
        "bg-transparent border-transparent text-ui-fg-subtle hover:bg-ui-bg-subtle-hover hover:text-ui-fg-base":
          !isCurrent,
      })}
      disabled={isCurrent}
      onClick={() => handlePageChange(p)}
    >
      {label}
    </button>
  )

  const renderEllipsis = (key: string) => (
    <span
      key={key}
      className="flex items-center justify-center w-10 h-10 text-ui-fg-muted"
    >
      ...
    </span>
  )

  const renderPageButtons = () => {
    const buttons = []
    if (totalPages <= 7) {
      buttons.push(
        ...arrayRange(1, totalPages).map((p) =>
          renderPageButton(p, p, p === page)
        )
      )
    } else {
      if (page <= 4) {
        buttons.push(
          ...arrayRange(1, 5).map((p) => renderPageButton(p, p, p === page))
        )
        buttons.push(renderEllipsis("ellipsis1"))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      } else if (page >= totalPages - 3) {
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis("ellipsis2"))
        buttons.push(
          ...arrayRange(totalPages - 4, totalPages).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
      } else {
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis("ellipsis3"))
        buttons.push(
          ...arrayRange(page - 1, page + 1).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
        buttons.push(renderEllipsis("ellipsis4"))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      }
    }
    return buttons
  }

  return (
    <div className="flex flex-col items-center gap-y-6 w-full mt-16 pb-12 border-t border-ui-border-base pt-12">
      <div className="flex items-center gap-x-2" data-testid={dataTestid}>
        <button
          className={clx(
            buttonBaseClass,
            "bg-transparent border-transparent mr-2 hover:bg-ui-bg-subtle-hover disabled:opacity-50"
          )}
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          <ArrowLeft />
        </button>

        {renderPageButtons()}

        <button
          className={clx(
            buttonBaseClass,
            "bg-transparent border-transparent ml-2 hover:bg-ui-bg-subtle-hover disabled:opacity-50"
          )}
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          <ArrowRight />
        </button>
      </div>

      <span className="text-ui-fg-muted text-small-regular">
        Страница {page} из {totalPages}
      </span>
    </div>
  )
}
