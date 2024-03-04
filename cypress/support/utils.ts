export const setToday = (today: string) => {
    const todaysDate = new Date(today);
    cy.clock(todaysDate.getTime());
};

export const stubProgram = (fixture: string) => {
    cy.intercept('GET', '/program.json', { fixture: fixture }).as('fetchProgramData');
    cy.wait('@fetchProgramData').its('response.statusCode').should('eq', 200);
};