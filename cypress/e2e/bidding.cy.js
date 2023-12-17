/// <reference types="cypress" />

describe("adding a bid into other users post", () => {
  it("places a bid into other users post", () => {
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

    // submits the form for loggin in
    cy.get('[type="submit"]').click();

    cy.wait(300);

    // clicks the Start Bidding button to navigation to auctions page
    cy.contains("a", "Start Bidding").click();

    // sorts the listing and gets the 1st item with less bids
    cy.get("#sortSelect").select("lowestBids");

    //clicks the very first first of the parent div to navigate to a single post
    cy.get(
      ".flex.flex-col.border.rounded-lg.overflow-hidden.shadow-lg:first-child a"
    ).click();

    // assumes that the latest post has a total bids of 0
    cy.get('[type="number"]').type("1");
    
    // Makes the bid after putting the amount
    cy.contains('button', 'Make Bid').click();
  });
});
