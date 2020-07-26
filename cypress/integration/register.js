/// <reference types="Cypress" />

const faker = require('faker');
let osnovnoIme = faker.name.findName();
let prezIme = faker.name.lastName();
let randomEmail = faker.internet.email();
let randomPassword = faker.internet.password();


describe('Registration page', ()=> {
  beforeEach('Should be first page before registration', ()=>{
    cy.visit('/register');
  })
    it('GA-14 : Register page positive test - valid data', ()=> {
      cy.get('#first-name').type(osnovnoIme);
      cy.get('#last-name').type(prezIme);
      cy.get('#email').type(randomEmail);
      cy.get('#password').type(randomPassword);
      cy.get('#password-confirmation').type(randomPassword);
      cy.get('input[type=checkbox]').check();
      cy.get('button[type=submit]').click();
      cy.wait(2000);
      cy.location().should((loc)=>{
         expect(loc.origin).to.eq('https://gallery-app.vivifyideas.com')
      });
    });
    it('GA-81 : Confirmation password doesnt match', ()=>{
      cy.get('#first-name').type(osnovnoIme);
      cy.get('#last-name').type(prezIme);
      cy.get('#email').type(randomEmail);
      cy.get('#password').type(randomPassword);
      cy.get('#password-confirmation').type('12345678');
      cy.get('input[type=checkbox]').check();
      cy.get('button[type=submit]').click();
      cy.get('.alert').should('have.text', 'The password confirmation does not match.')
    });
    it('GA-40 : Register page test - First name input field: required', ()=>{
      cy.get('#last-name').type(prezIme);
      cy.get('#email').type(randomEmail);
      cy.get('#password').type(randomPassword);
      cy.get('#password-confirmation').type(randomPassword);
      cy.get('input[type=checkbox]').check();
      cy.get('button[type=submit]').click();
      const getAlert = () =>{
        return 'Please fill in this field'
      };
      cy.wrap({alert:getAlert}).invoke('alert').should('eq', 'Please fill in this field');
    });
    it('GA-46 : Register page test - Last name input field: required', ()=>{
      cy.get('#first-name').type(osnovnoIme);
      cy.get('#email').type(randomEmail);
      cy.get('#password').type(randomPassword);
      cy.get('#password-confirmation').type(randomPassword);
      cy.get('input[type=checkbox]').check();
      cy.get('button[type=submit]').click();
    });
    it('GA-59 : Register page test - Password input field empty', ()=> {
      cy.get('#first-name').type(osnovnoIme);
      cy.get('#last-name').type(prezIme);
      cy.get('#email').type(randomEmail); 
      cy.get('#password-confirmation').type(randomPassword);
      cy.get('[type="checkbox"]').check();
      cy.get('[type=submit]').click();
    });
    it('GA-83 : Password form - password has less then 8 characters', ()=>{
      cy.get('#first-name').type(osnovnoIme);
      cy.get('#last-name').type(prezIme);
      cy.get('#email').type(randomEmail);
      cy.get('#password').type('123');
      cy.get('#password-confirmation').type('123');
      cy.get('input[type=checkbox]').check();
      cy.get('button[type=submit]').click();
      cy.get('.alert').should('have.text', 'The password must be at least 8 characters.')
    });
    it.only('GA-84 : User cant register twice', ()=>{
      cy.get('#first-name').type('test');
      cy.get('#last-name').type('test');
      cy.get('#email').type('ruzictam@gmail.com');
      cy.get('#password').type('testtest2');
      cy.get('#password-confirmation').type('testtest2');
      cy.get('input[type=checkbox]').check();
      cy.get('button[type=submit]').click();
      cy.get('.alert').should('have.text', 'The email has already been taken.')
    });
});