const siteOrigin = 'https://www.lucaskjaerozhang.com'
const sourceFileCommand =
  "find resume src/components src/content src/layouts src/pages -type f \\( -name '*.astro' -o -name '*.js' -o -name '*.jsx' -o -name '*.md' -o -name '*.mdx' -o -name '*.tex' -o -name '*.ts' -o -name '*.tsx' \\)"
const skippedExtensions = new Set([
  '.css',
  '.ico',
  '.jpg',
  '.js',
  '.json',
  '.pdf',
  '.png',
  '.svg',
  '.webmanifest',
  '.woff2',
  '.xml',
])
const linkPatterns = [
  /https:\/\/www\.lucaskjaerozhang\.com[^\s"'})\\<>]*/g,
  /\[[^\]]+\]\((\/[^)#\s]+(?:#[^)]+)?)\)/g,
  /href=["'](\/[^"']+)["']/g,
  /href:\s*["'`](\/[^"'`]+)["'`]/g,
]

function normalizeInternalLink(rawLink) {
  const link = rawLink.replace(/&amp;/g, '&')
  if (link.includes('${')) return null

  if (link.startsWith(siteOrigin)) {
    return link.slice(siteOrigin.length) || '/'
  }

  if (link.startsWith('/') && !link.startsWith('//')) {
    return link
  }

  return null
}

function shouldCheckPath(linkPath) {
  const pathWithoutHash = linkPath.split('#')[0]
  const pathWithoutQuery = pathWithoutHash.split('?')[0]
  const extension = pathWithoutQuery.match(/\.[^/.]+$/)?.[0] ?? ''

  return pathWithoutQuery && !skippedExtensions.has(extension)
}

function addInternalLinks(links, file, contents) {
  linkPatterns.forEach((pattern) => {
    for (const match of contents.matchAll(pattern)) {
      const rawLink = match[1] ?? match[0]
      const normalizedLink = normalizeInternalLink(rawLink)
      if (!normalizedLink || !shouldCheckPath(normalizedLink)) continue

      const routePath = normalizedLink.split('#')[0]
      const sources = links.get(routePath) ?? []
      sources.push(file)
      links.set(routePath, sources)
    }
  })
}

describe('internal source links', () => {
  it('resolve on the local site', () => {
    const links = new Map()

    cy.exec(sourceFileCommand).then(({ stdout }) => {
      stdout
        .split('\n')
        .filter(Boolean)
        .forEach((file) => {
          cy.readFile(file).then((contents) => {
            addInternalLinks(links, file, contents)
          })
        })

      cy.then(() => {
        const sortedLinks = [...links.entries()]
          .map(([path, sources]) => ({
            path,
            sources: [...new Set(sources)].sort(),
          }))
          .sort((a, b) => a.path.localeCompare(b.path))

        cy.wrap(sortedLinks).should('not.be.empty')

        sortedLinks.forEach((link) => {
          cy.log(`${link.path} from ${link.sources.join(', ')}`)
          cy.request({
            url: link.path,
            followRedirect: true,
            failOnStatusCode: false,
          })
            .its('status')
            .should('be.lessThan', 400)
        })
      })
    })
  })
})
