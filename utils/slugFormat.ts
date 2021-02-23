export const formatSlug = (date: string, slug: string) => {
  const publishDate = new Date(date)
  const publishYear = publishDate.getFullYear()
  const publishMonth = `0${publishDate.getMonth() + 1}`.slice(-2)

  return `/${publishYear}/${publishMonth}/${slug}`
}
