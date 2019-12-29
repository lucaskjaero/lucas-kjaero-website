describe("Check the home page", function() {
  beforeEach(function() {
    cy.visit("/");
  });

  it("Has my tagline", function() {
    cy.get("h2").should("contain", "Technologist. Traveler.");
  });

  it("Has my pitch", function() {
    cy.get(".pitch").should("contain", "the");
  });
});
