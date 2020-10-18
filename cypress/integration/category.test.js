describe("Check a category page", function () {
  beforeEach(function () {
    cy.visit("/category/full-stack");
  });

  it("Loads the category page", function () {
    cy.get("span").should("contain", "Projects in category");
    cy.get("h1").should("contain", "Full Stack");
  });

  it("Category should contain this website", function () {
    cy.get("a").should("contain", "Lucas Kjaero-Zhang Website");
  });
});
