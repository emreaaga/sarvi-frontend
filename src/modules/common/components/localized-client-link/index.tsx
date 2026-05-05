"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

/**
 * Этот компонент автоматически добавляет код страны И код языка в URL,
 * чтобы пользователю не приходилось вручную прописывать их в каждой ссылке.
 */
const LocalizedClientLink = ({
  children,
  href,
  ...props
}: {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: true
  [x: string]: any
}) => {
  const { countryCode, locale } = useParams()

  const localizedHref = `/${countryCode}/${locale}${
    href.startsWith("/") ? "" : "/"
  }${href}`

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink
