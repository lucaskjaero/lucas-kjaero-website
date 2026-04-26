const pages = [
  {
    path: '/',
    title: 'Lucas Kjaero-Zhang',
    assertion: () => {
      cy.contains('h1', 'Lucas Kjaero-Zhang').should('exist')
      cy.contains('a', 'View Work').should('have.attr', 'href', '/blog')
    },
  },
  {
    path: '/blog',
    title: 'Work',
    assertion: () => {
      cy.contains('a', 'RPM data access lambda').should('exist')
    },
  },
  {
    path: '/blog/rpm-data-access-lambda',
    title: 'RPM data access lambda',
    assertion: () => {
      cy.contains('h1', 'RPM data access lambda').should('exist')
    },
  },
  {
    path: '/about',
    title: 'About',
    assertion: () => {
      cy.contains('h1', 'About Me').should('exist')
    },
  },
  {
    path: '/resume-landing',
    title: 'Resume',
    assertion: () => {
      cy.contains('h1', 'Resume').should('exist')
      cy.contains('a', 'English').should('have.attr', 'href', '/lucas-kjaero-zhang-resume.pdf')
    },
  },
  {
    path: '/tags',
    title: 'Tags',
    assertion: () => {
      cy.contains('a', 'python').should('exist')
    },
  },
]

describe('site smoke tests', () => {
  pages.forEach(({ path, title, assertion }) => {
    it(`loads ${path}`, () => {
      cy.visit(path)
      cy.location('pathname').should('not.include', '404')
      cy.title().should('include', title)
      cy.get('header').should('exist')
      cy.get('footer').should('exist')
      cy.contains('404: Not found').should('not.exist')
      assertion()
    })
  })

  it('serves RSS', () => {
    cy.request('/rss.xml')
      .its('body')
      .should('include', '<rss')
      .and('include', 'RPM data access lambda')
  })
})
