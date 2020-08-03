
 Cypress.Commands.add("loginBe", (imejl, lozinka) => {
     Cypress.log({
         name : 'loginByForm',
         message: imejl + '|' + lozinka
     })
     cy.request({
         method: 'POST',
         url: Cypress.env('apiUrl') + '/auth/login',
         form: true,
         followRedirect: true,
         body:{
             email: imejl,
             password: lozinka
         }
     }).then((resp)=>{
        cy.log(resp.body);
        expect(resp.body).to.have.property('access_token')
        localStorage.setItem('token', resp.body.access_token)
        cy.visit('/')
  })
 })

