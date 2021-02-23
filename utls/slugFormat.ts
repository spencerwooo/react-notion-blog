export const formatSlug = (date: string, slug: string) => {
  const publishDate = new Date(date)
  const publishYear = publishDate.getFullYear()
  const publishMonth = `0${publishDate.getMonth()}`.slice(-2)

  return `/${publishYear}/${publishMonth}/${slug}`
}
