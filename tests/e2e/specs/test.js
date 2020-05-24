// https://docs.cypress.io/api/introduction/api.html

describe('Basic test', () => {
    it('Visits the app root url and displays the login page', () => {
        cy.visit('/')
        cy.contains('button', 'Create an account')
    })
})
