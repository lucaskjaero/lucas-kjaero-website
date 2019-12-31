describe("Check the project page", function() {
  beforeEach(function() {
    cy.visit("/project/");
  });

  it("Loads project page", function() {
    cy.get("h1").should("contain", "Projects by category");
  });

  it("A project is successfully rendered", function() {
    cy.get("a").should("contain", "Lucas Kjaero-Zhang Website");
    cy.get("span").should("contain", "react");
  });
});
