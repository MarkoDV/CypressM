/// <reference types="Cypress"/> 
import {user} from '../fixtures/constants';
describe('Create gallery', ()=>{
    beforeEach(()=>{
        cy.server();
        cy.route('GET', Cypress.env('apiUrl') + '/galleries?page=1&term=', /*'fixture:all.json'*/).as('stubing')
    })
    it.only('stubing', ()=> {
        cy.loginBe(user.email, user.password);
        cy.request('POST', Cypress.env('apiUrl') + '/auth/login', {"email":"Clarabelle55@yahoo.com","password":"T2dwnCpQ89vybFz"})
        .then((resp)=>{
            cy.log(resp.body);
            expect(resp.body).to.have.property('access_token')
            localStorage.setItem('token', resp.body.access_token)
        });
        cy.visit('/');
        cy.wait('@stubing');
        cy.get('@stubing').its('response').then((resp)=>{
           cy.log(resp.body.count);
            cy.request({
                method: 'DELETE',
                url: Cypress.env('apiUrl') + '/galleries' + resp.body.galleries[0].id,
                form: true,
                followRedirect: true,
                headers: {
                    authorization:`Bearer ${window.localStorage.getItem('token')}`
                }
            })
            
      })
    })

})
    