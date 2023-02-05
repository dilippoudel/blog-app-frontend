describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:5000/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })
})
