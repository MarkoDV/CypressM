export default class AuthPage {
   get email(){
       return cy.get('#email');
    };
   get password(){
       return cy.get('#password');
    };
   get signInButton(){
       return cy.get('[type=submit]');
    };
   login(imejl, lozinka){
       this.email.type(imejl);
       this.password.type(lozinka);
       this.signInButton.click();
    };
};

export const authPage = new AuthPage;