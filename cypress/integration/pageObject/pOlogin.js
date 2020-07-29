export default class AuthPage {
    email(){
       return cy.get('#email');
    };
    password(){
       return cy.get('#password');
    };
    signInButton(){
       return cy.get('[type=submit]');
    };
};

export const authPage = new AuthPage;