describe("Check the contact page", function () {
  beforeEach(function () {
    cy.visit("/contact/");
  });

  it("Loads contact page", function () {
    cy.get("h1").should("contain", "Contact");
  });

  it("Failures redirect to failure page", function () {
    cy.server();
    cy.route({
      method: "POST",
      url: "https://formspree.io/meqelqay",
      status: 500,
      response: {
        error: "test",
      },
    });

    cy.get('input[name="name"]').type("test");
    cy.get('input[name="email"]').type("test@email.com");
    cy.get('textarea[name="message"]').type("test message");
    cy.get("button").click();

    cy.url().should("include", "/failure");
  });
});
