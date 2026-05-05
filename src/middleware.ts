import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION = "uz" // Устанавливаем узбекистан как дефолт
const SUPPORTED_LOCALES = ["ru-RU", "uz-UZ"]
const DEFAULT_LOCALE = "ru-RU"

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache
  if (!BACKEND_URL) throw new Error("Missing MEDUSA_BACKEND_URL")

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
      headers: { "x-publishable-api-key": PUBLISHABLE_API_KEY! },
      next: { revalidate: 3600, tags: [`regions-${cacheId}`] },
      cache: "force-cache",
    }).then(async (response) => {
      const json = await response.json()
      if (!response.ok) throw new Error(json.message)
      return json
    })

    regions.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((c) => {
        regionMapCache.regionMap.set(c.iso_2?.toLowerCase() ?? "", region)
      })
    })
    regionMapCache.regionMapUpdated = Date.now()
  }
  return regionMapCache.regionMap
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // Пропускаем статические ресурсы и API
  if (
    pathname.includes(".") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next()
  }

  const cacheIdCookie = request.cookies.get("_medusa_cache_id")
  const cacheId = cacheIdCookie?.value || crypto.randomUUID()
  const regionMap = await getRegionMap(cacheId)

  const segments = pathname.split("/").filter(Boolean)
  const urlCountry = segments[0]?.toLowerCase()
  const urlLocale = segments[1]

  // Проверяем валидность страны и языка в URL
  const isCountryValid = urlCountry && regionMap.has(urlCountry)
  const isLocaleValid = urlLocale && SUPPORTED_LOCALES.includes(urlLocale)

  // Если URL уже содержит правильные /[countryCode]/[locale], просто продолжаем
  if (isCountryValid && isLocaleValid) {
    if (cacheIdCookie) return NextResponse.next()
    const response = NextResponse.next()
    response.cookies.set("_medusa_cache_id", cacheId, { maxAge: 60 * 60 * 24 })
    return response
  }

  // Определяем, куда редиректить
  const targetCountry = isCountryValid ? urlCountry : DEFAULT_REGION
  const targetLocale =
    request.cookies.get("_medusa_locale")?.value || DEFAULT_LOCALE

  // Очищаем путь от "мусорных" или неверных префиксов, чтобы не было дублей
  let cleanSegments = [...segments]
  if (urlCountry && (urlCountry.length === 2 || regionMap.has(urlCountry))) {
    cleanSegments.shift() // удаляем первый сегмент, если он похож на код страны
    if (
      urlLocale &&
      (urlLocale.includes("-") || SUPPORTED_LOCALES.includes(urlLocale))
    ) {
      cleanSegments.shift() // удаляем второй сегмент, если он похож на локаль
    }
  }

  const finalPath = `/${targetCountry}/${targetLocale}/${cleanSegments.join(
    "/"
  )}`
  const redirectUrl = new URL(
    `${finalPath.replace(/\/+$/, "")}${search}`,
    request.nextUrl.origin
  )

  // Защита от бесконечного редиректа на тот же адрес
  if (redirectUrl.pathname === pathname) {
    return NextResponse.next()
  }

  const response = NextResponse.redirect(redirectUrl, 307)

  // Устанавливаем куку кэша Medusa
  if (!cacheIdCookie) {
    response.cookies.set("_medusa_cache_id", cacheId, { maxAge: 60 * 60 * 24 })
  }

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
