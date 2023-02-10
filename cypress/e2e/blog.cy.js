describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:5000/api/testing/reset')
    cy.request({
      method: 'POST',
      body: {
        username: 'dilip123',
        password: 'password',
        name: 'Dilip',
      },
      url: 'http://localhost:5000/api/users',
    })
    cy.request({
      method: 'POST',
      body: {
        name: 'Samita',
        username: 'samita123',
        password: 'password',
      },
      url: 'http://localhost:5000/api/users',
    })
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })
  describe('Log in', function () {
    it('Log in succeeds with correct credentials', function () {
      cy.get('#username').type('dilip123')
      cy.get('#password').type('password')
      cy.contains('Login').click()
      cy.contains('welcome back')
      cy.contains('is logged in')
      cy.contains('Log out')
    })
    it('log in fails with wrong credentials', function () {
      cy.get('#username').type('dilip1234')
      cy.get('#password').type('passwordd')
      cy.contains('Login').click()

      cy.get('.error')
        .should('contain', 'username or password invalid')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Log out')
    })
    describe('when logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'dilip123', password: 'password' })
      })
      it('user is logged in', function () {
        cy.contains('Dilip is logged in')
      })
      it('A blog can be created', function () {
        cy.contains('Create new Blog').click()
        cy.get('#title').type('A jacky John')
        cy.get('#author').type('Dilip Poudel')
        cy.get('#url').type('https://localhost/3000/dilip')
        cy.get('#submit').click()
        cy.contains('A jacky John')
      })
      describe('when several blogs exists', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'FirstBlog',
            author: 'Dilip Poudel',
            url: 'https://localhost:3004/dilip',
          })
          cy.createBlog({
            title: 'Second Blog',
            author: 'Dilip Poudel',
            url: 'https://localhost:3005/samita',
          })
        })
        it('should contain list of blogs', function () {
          cy.contains('Second Blog')
          cy.contains('FirstBlog')
        })
        it('should update the like of one of those', function () {
          cy.contains('FirstBlog').parent().find('button').click()
          cy.get('#like').click()
          cy.contains('Likes: 1')
        })
        it('creator can delete the blog', function () {
          cy.contains('show').click()
          cy.get('#delete').click()
          cy.should('not.contain', 'First Blog')
        })
        describe('When another user exists', function () {
          beforeEach(function () {
            cy.login({
              username: 'samita123',
              password: 'password',
            })
            cy.visit('')
          })
          it('user is logged in', function () {
            cy.contains('Samita is logged in')
          })
          it('Current log in user can not see delete button', function () {
            cy.contains('FirstBlog').parent().find('button').click()
            cy.should('not.contain', 'Delete')
          })
          it('Should check the order of blog based on number of likes', function () {
            cy.contains('FirstBlog').parent().find('button').click()
            cy.get('[data-test="test-blog-samita123-FirstBlog"]')
              .click()
              .wait(1000)
              .click()
              .wait(1000)
              .click()
            cy.contains('Second Blog').parent().find('button').click()
            cy.get('[data-test="test-blog-samita123-Second-Blog"]')
              .click()
              .wait(1000)
              .click()
              .wait(1000)
              .click()
              .wait(1000)
              .click()
            cy.get('.blog_container').eq(0).should('contain', 'Second Blog')
            cy.get('.blog_container').eq(1).should('contain', 'FirstBlog')
          })
        })
      })
    })
  })
})
