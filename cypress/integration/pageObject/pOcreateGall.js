export default class CreateGall {
    get createGallBttn(){
        return cy.get('.nav-link').contains('Create Gallery');
    };
    get title (){
        return cy.get('#title');
    };
    get descript(){
        return cy.get('#description');
    };
    get image(){
        return cy.get('input[type=url]');
    };
    get submitting(){
        return cy.get('.btn-custom').contains('Submit');
    };
    creation(naslov, opis, slika){
        this.createGallBttn.click();
        this.title.type(naslov);
        this.descript.type(opis);
        this.image.type(slika);
        this.submitting.click();
    };
};
export const createGall = new CreateGall;