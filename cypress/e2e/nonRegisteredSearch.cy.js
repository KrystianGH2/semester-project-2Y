/// <reference types="cypress" />
describe("Search", () => {
  it("search through listings", () => {
    cy.visit("https://bidbuddies.netlify.app/auctions");

    // Gets the input search bar and types an Item name
    cy.get("#default-search").type("Yellow Sofa", { delay: 100 });

    // Clicks the 'search' button to submit the search
    cy.get('[type="submit"]', { delay: 100 }).click();

    // Hover over the href image to navigate into the single items that is selected
    cy.get('[href="/listings/0c3e1612-7997-4fa8-b2c6-a27f30ebbc37"]').click();

    // Wait for a while to observe the hover effect (you can adjust the duration)
    cy.wait(1000); // Adjust the duration as needed

    // Continue with the rest of your test
    cy.get("[type=number]").type("123", { delay: 100 });

    //When none registered user try to make a bid, they will be met with an popup message that tells them to log in to make a bid
    cy.contains("[type=button]", "Make Bid").trigger("mouseover");
  });
});
