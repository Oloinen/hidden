import { setToday, stubProgram } from '../support/utils';
import { expectedFor1stDay, expectedFor22ndDay, expectedFor4thDay, expectedFor14thDay } from '../support/results';

describe('TableContainer Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Displays the table with correct data static data', () => {
    setToday('2022-02-22');
    stubProgram('all_weeks_incomplete.json');

    cy.get('.table-wrapper').should('exist')
    cy.get('.heading-text').should('contain', 'Weekly Program')
    cy.get('[data-cy="header-cell"]').should('have.length', 7)
    cy.get('[data-cy="header-text0"]').should('contain', 'MON')
    cy.get('[data-cy="header-text6"]').should('contain', 'SUN')
  });

  it('Displays the table with correct amount of rows and cells for a month spanning 4 calendar weeks', () => {
    setToday('2021-02-22');
    stubProgram('all_weeks_incomplete.json');

    cy.get('[data-cy="day-cell"]').should('have.length', 28)
    cy.get('[data-cy="day-cell-row"]').should('have.length', 4)
  });

  it('Displays the table with correct amount of rows and cells for a month spanning 5 calendar weeks', () => {
    setToday('2023-05-22');
    stubProgram('all_weeks_incomplete.json');
  
    cy.get('[data-cy="day-cell"]').should('have.length', 35)
    cy.get('[data-cy="day-cell-row"]').should('have.length', 5)
  });

  it('Displays the table with correct amount of rows and days for a month spanning 4 calendar weeks', () => {
    setToday('2023-07-22');
    stubProgram('all_weeks_incomplete.json');
    
    cy.get('[data-cy="day-cell"]').should('have.length', 42)
    cy.get('[data-cy="day-cell-row"]').should('have.length', 6)
  });

  it('Displays only todays date in highlighted color', () => {
    setToday('2022-02-08');
    stubProgram('all_weeks_incomplete.json');
    
    cy.get('.cell-highlighted').should('have.length', 1)
    cy.get('.cell-highlighted').should('contain', 8)
  });

  it('Displays correct titles on correct days when today is first day of month', () => {   
    setToday('2023-05-01');
    stubProgram('all_weeks_incomplete.json');

    cy.get('[data-cy="day-cell-title"]').each(($cell, index) => {
      cy.wrap($cell).should('have.text', expectedFor1stDay[index]);
    })
  });

  it('Displays incomplete tasks from past and future incomplete tasks correctly spread when today is on third week', () => {
    setToday('2023-05-22');
    stubProgram('all_weeks_incomplete.json');

    cy.get('[data-cy="day-cell-title"]').each(($cell, index) => {
      cy.wrap($cell).should('have.text', expectedFor22ndDay[index]);
    });
  });

  it('Displays incomplete tasks from past and future incomplete tasks correctly spread when today is first task day ', () => {
    setToday('2024-03-04');
    stubProgram('all_weeks_incomplete.json');

    cy.get('[data-cy="day-cell-title"]').each(($cell, index) => {
      cy.wrap($cell).should('have.text', expectedFor4thDay[index]);
    });
  });

  it('Displays incomplete tasks from past and future incomplete tasks correctly spread when today in middle ', () => {
    setToday('2023-05-17');
    stubProgram('second_week_incomplete.json');

    cy.get('[data-cy="day-cell-title"]').each(($cell, index) => {
      cy.wrap($cell).should('have.text', expectedFor14thDay[index]);
    });
  });
});
