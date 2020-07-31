/// <reference types="Cypress" />
import {user} from '../fixtures/constants';
import  { authPage } from '../integration/pageObject/pOlogin';
import {createGall} from '../integration/pageObject/pOcreateGall'

const faker = require('faker');
let randomTitle = faker.random.word();
let randomDescription = faker.random.words();
let randomImages =  faker.image.imageUrl();

describe('Create gallery', ()=>{
    beforeEach('Visit login page and login', ()=>{
        cy.visit('/login');
        cy.server();
        cy.route(Cypress.env('apiUrl')).as('hp');
        cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries');
        cy.route(Cypress.env('apiUrl') + '/create').as('createGall');
        cy.get('.nav-link').contains('Login').click();
        authPage.login(user.email, user.password);
        cy.wait('@galleries');
    });
    it('GA-12 : Create New Gallery Page validation',()=>{
        createGall.creation(randomTitle, randomDescription, 'https://media-cdn.tripadvisor.com/media/photo-p/10/03/28/52/pogled-iz-baste-na-zalazak.jpg');
        cy.url().should("eq", "https://gallery-app.vivifyideas.com/");
    });
    it('GA-33 : Home Page - paginacija Logged in user 20 galleries',()=>{
        cy.get('.nav-link').contains('My Galleries').should('be.visible').click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/my-galleries');
        for(let i =0; i<9; i++){
            createGall.creation(randomTitle, randomDescription, 'https://media-cdn.tripadvisor.com/media/photo-p/10/03/28/52/pogled-iz-baste-na-zalazak.jpg');
            cy.url().should('eq','https://gallery-app.vivifyideas.com/');
        };
        cy.get('div.grid').children().should('have.length', 10);
    });
    it('Load more button', ()=>{
        cy.get('.nav-link').contains('My Galleries').should('be.visible').click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/my-galleries');
        cy.scrollTo('bottom');
        cy.get(':nth-child(3) > :nth-child(2) > .btn').should('not.exist');
    });
    it('Delete My Galleries', ()=>{
       for(let i=0; i<10; i++) {
           cy.visit('/my-galleries');
           cy.get('.box-title').eq(0).click();
           cy.get('.btn-custom').contains('Delete Gallery').should('be.visible').click(); 
       }
    }); 
    it('No gallery found', ()=>{
        cy.get('.nav-link').contains('My Galleries').click();
        cy.get('h4').contains("No galleries found").should('be.visible');
    });
  });