/* global cy, describe, it */ // Cypress globals; ESLint isn't configured for cypress/ yet
describe('Registration link validation', () => {
  it('rejects a link with no courseId or sectionId', () => {
    cy.intercept('GET', '**/users/exists/*', { flag: true, code: 200, message: 'ok', data: false })
    cy.visit('/register?email=new.student@abc.edu&token=registrationToken&role=student')
    cy.location('pathname').should('eq', '/403')
  })

  it('still shows the form for a complete link', () => {
    cy.intercept('GET', '**/users/exists/*', { flag: true, code: 200, message: 'ok', data: false })
    cy.visit(
      '/register?email=new.student@abc.edu&token=registrationToken&courseId=1&sectionId=2&role=student'
    )
    cy.contains('button', 'Register').should('be.visible')
  })
})