/// <reference types="cypress" />

describe("Logging in", () => {
  it("fills the form", () => {
    cy.visit("https://bidbuddies.netlify.app/login");

    // mock the behavior of a POST request to the specified login API endpoint
    cy.intercept("POST", `https://api.noroff.dev/api/v1/auction/auth/login`).as(
      "submit-login"
    );

    //getting the id of the email input
    cy.get("#email").type("randomuser_321@stud.noroff.no");

    //  checks that the input value of the email has been updated
    cy.get("#email").should("have.value", "randomuser_321@stud.noroff.no");

    cy.get("#password").type("random321");

    //  checks that the input value of the password has been updated
    cy.get("#password").should("have.value", "random321");

    cy.get('[type="submit"]').click();
  });
});
