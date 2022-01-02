

describe('example to-do app', () => {

    it('Does not do much!', () => {
        cy.visit("http://192.168.1.144:8080/")
        cy.get('table')
        .find('tbody tr:last')
        .find('td')
        .last()
        .find("button")
        .last()
        .click()
        
      })

      /* it('Does not do much!', () => {
        const url= "https://accounts.google.com/o/oauth2/v2/auth/identifier?access_type=offline&scope=https%3A%2F%2Fmail.google.com%2F%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.modify%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.compose%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.send%20https%3A%2F%2Fmail.google.com%2F&response_type=code&client_id=1085129827280-e3d53slb6bd5pljaag74omemhphgv2kp.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8080&flowName=GeneralOAuthFlow";
        cy.request("POST",url, {
            identifier: 'innosoft.eventia@gmail.com'
        }).then((response) => {
            const loc = response
            console.log("loc es ", loc)
            cy.log(response.headers["ocation"])
        })
        
      }) */
//eventiaegc2021
})
