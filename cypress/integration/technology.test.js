describe("Check a technology page", function () {
  beforeEach(function () {
    cy.visit("/technology/react");
  });

  it("Loads the technology page", function () {
    cy.get("span").should("contain", "Projects using technology");
    cy.get("h1").should("contain", "react");
  });

  it("technology should contain this website", function () {
    cy.get("a").should("contain", "Lucas Kjaero-Zhang Website");
  });
});
