/// <reference types="Cypress" />
import {user} from '../fixtures/constants';
import  { authPage } from '../integration/pageObject/pOlogin';
const faker = require('faker');
let randomEmail = faker.internet.email();
let randomPassword = faker.internet.password();

describe('The Home Page', ()=> {
  beforeEach('Should visit Login page', ()=>{
    cy.visit('/login');
    cy.server();
    cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries');
  });
    it.only('GA-28 Login-valid data', ()=> {
      cy.get('.nav-link').contains('Login').click();
      authPage.login(user.email, user.password);
      cy.wait('@galleries')
      cy.get('.nav-link').contains('Logout').should('be.visible');
    });
    it('GA-22 Login- invalid data-email', ()=>{
      cy.get('.nav-link').contains('Login').click();
      authPage.email().type(randomEmail);
      authPage.password().type('12345678');
      authPage.signInButton().click();
    });
    it('GA-25 Login invalid data - password', ()=>{
      cy.get('.nav-link').contains('Login').click();
      authPage.email().type('test@test.com');
      authPage.password().type(randomPassword);
      authPage.signInButton().click();
    });
  });
describe('Logged', ()=>{
  beforeEach('Should visit Login page', ()=>{
    cy.visit('/login');
    cy.server();
    cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries');
  });
  it('GA-32 : User is logged', ()=> {
    cy.get('.nav-link').contains('Login').click();
    authPage.login(user.email, user.password);
    cy.wait('@galleries');
    cy.get('.form-control').should('have.attr', 'placeholder', 'Search...');
    cy.get('[type=button]').should('be.visible');
  });
});

