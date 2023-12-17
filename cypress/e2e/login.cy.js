/// <reference types="cypress" />

describe("Logging in", () => {
  it("fills the form", () => {
    cy.visit("https://bidbuddies.netlify.app/login");

    // mock the behavior of a POST request to the specified login API endpoint
    cy.intercept("POST", `https://api.noroff.dev/api/v1/auction/auth/login`).as(
      "submit-login"
    );

    //getting the id of the email input
    cy.get("#email").type("random@stud.noroff.no");

    //  checks that the input value of the email has been updated
    cy.get("#email").should("have.value", "random@stud.noroff.no");

    cy.get("#password").type("random123");

    //  checks that the input value of the password has been updated
    cy.get("#password").should("have.value", "random123");

    cy.get('[type="submit"]').click();
  });
});
