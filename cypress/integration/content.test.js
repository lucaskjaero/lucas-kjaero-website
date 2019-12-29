describe("Check the content", function() {
  it("Has a valid source link for all source buttons", function() {
    cy.visit("/");
    cy.get("link").then(links => {
      if (links) {
        links.each(link => {
          link.click();

          cy.get("sourceButton").then(source => {
            if (source) {
              source.click();
            }
          });
        });
      }
    });
  });
});
