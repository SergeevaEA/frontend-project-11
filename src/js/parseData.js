export default (data) => {
  const parser = new DOMParser()
  const dom = parser.parseFromString(data, 'text/xml')
  const parserError = dom.getElementsByTagName('parseerror')
  if (parserError.length > 0) {
    throw new Error('parsingError')
  }
  const rss = dom.querySelector('rss, feed')
  if (!rss) {
    throw new Error('rss')
  }
  return dom
}
