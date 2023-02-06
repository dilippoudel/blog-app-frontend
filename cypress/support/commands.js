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
