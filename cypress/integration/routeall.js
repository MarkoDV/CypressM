/// <reference types="Cypress"/> 
import {user} from '../fixtures/constants';
describe('Create gallery', ()=>{
    beforeEach(()=>{
        cy.server();
        cy.route('GET', Cypress.env('apiUrl') + '/my-galleries?page=1&term=', /*'fixture:all.json'*/).as('stubing')
    })
    it.only('stubing', ()=> {
        cy.loginBe(user.email, user.password);
        cy.request('POST', Cypress.env('apiUrl') + '/auth/login', {"email":"Clarabelle55@yahoo.com","password":"T2dwnCpQ89vybFz"})
        .then((response)=>{
            cy.log(response.body);
            expect(response.body).to.have.property('access_token')
            localStorage.setItem('token', response.body.access_token)
        });
        cy.visit('/my-galleries');
        cy.wait('@stubing');
        cy.get('@stubing').its('response').then((response)=>{
           cy.log(response);
           let userCaseID = response.body.galleries[0].id
            cy.request({
                method: 'DELETE',
                url: `${Cypress.env('apiUrl')}/galleries/${userCaseID}`,
                form: true,
                followRedirect: true,
                headers: {
                    authorization:`Bearer ${window.localStorage.getItem('token')}`
                }
            })
            
      })
    })

})
    