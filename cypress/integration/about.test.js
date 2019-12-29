describe("Check the about page", function() {
  it("Loads about page", function() {
    cy.visit("/about/");
    cy.get("h1").should("contain", "About me");
  });
});
