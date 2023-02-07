Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/login`,
    body: {
      username,
      password,
    },
    failOnStatusCode: false,
  }).then((response) => {
    window.localStorage.setItem(
      'loggedBlogappUser',
      JSON.stringify(response.body)
    )
    cy.visit('')
  })
})
Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogappUser')).token
      }`,
    },
  })
  cy.visit('')
})
