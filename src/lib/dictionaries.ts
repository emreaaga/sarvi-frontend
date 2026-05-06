const dictionaries = {
  "ru-RU": () =>
    import("./dictionaries/ru.json").then((module) => module.default),
  "uz-UZ": () =>
    import("./dictionaries/uz.json").then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  return (
    dictionaries[locale as keyof typeof dictionaries]?.() ??
    dictionaries["ru-RU"]()
  )
}
