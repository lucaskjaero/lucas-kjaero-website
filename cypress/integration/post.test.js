describe("Check a project page", function() {
  beforeEach(function() {
    cy.visit("/Lucas-Kjaero-Zhang-Website/");
  });

  it("Loads the front matter", function() {
    cy.get("a").should("contain", "Full Stack");
    cy.get("a").should("contain", "react");
    cy.get("a").should("contain", "View Source");
  });

  it("Loads the project content", function() {
    cy.get("h2").should("contain", "What I learned");
  });
});
