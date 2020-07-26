/// <reference types="Cypress" />
const faker = require('faker');
let randomEmail = faker.internet.email();
let randomPassword = faker.internet.password();

describe('The Home Page', ()=> {
    it('GA-28 Login-valid data', ()=> {
      cy.visit('/');
      cy.get('.nav-link').contains('Login').click();
      cy.get('#email').type('test@test.com');
      cy.get('#password').type('12345678');
      cy.get('[type=submit]').click()
      cy.wait(4000);
      cy.get('.nav-link').contains('Logout').should('be.visible');
    });
    it.only('GA-22 Login- invalid data-email', ()=>{
      cy.visit('/');
      cy.get('.nav-link').contains('Login').click();
      cy.get('#email').type(randomEmail);
      cy.get('#password').type('12345678');
      cy.get('[type=submit]').click();
    });
    it.only('GA-25 Login invalid data - password', ()=>{
      cy.visit('/');
      cy.get('.nav-link').contains('Login').click();
      cy.get('#email').type('test@test.com');
      cy.get('#password').type(randomPassword);
      cy.get('[type=submit]').click();
    });
  });
describe.only('Logged', ()=>{
  it('GA-32 : User is logged', ()=> {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    cy.get('#email').type('jelllenakrstic@gmail.com')
    cy.get('#password').type('jelenak1908')
    cy.get('[type=submit]').click()
    cy.wait(1000)
    cy.get('.nav-link').contains('Logout').should('be.visible')
    cy.get('.nav-link').contains('My Galleries')
    cy.get('.nav-link').contains('Create Gallery')
    cy.get('.nav-link').contains('Logout')
    cy.get('.title-style').contains('All Galleries')
    cy.wait(3000);
    cy.get('.form-control').should('have.attr', 'placeholder', 'Search...');
    cy.get('[type=button]').should('be.visible');
  });
});

