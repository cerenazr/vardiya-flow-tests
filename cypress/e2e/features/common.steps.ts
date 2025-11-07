import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const credentials = {
  email: "ceren+1@example.com",
  password: "Passw0rd!",
};

const HEALTH_ENDPOINT = "/api/health";
const availabilityMatcher = /\/api\/v1\/availabilit(y|ies)/;

Given("Rails API ayakta", () => {
  cy.log(`Checking Rails health at ${HEALTH_ENDPOINT}`);
  cy.request("GET", HEALTH_ENDPOINT).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.deep.equal({ ok: true });
  });
});

Given("API isteklerini izliyorum", () => {
  cy.intercept("POST", "**/api/v1/auth/login").as("loginRequest");
  cy.intercept("GET", "**/api/v1/shifts*").as("getShifts");
  cy.intercept("POST", "**/api/v1/shifts").as("createShift");
  cy.intercept("POST", availabilityMatcher).as("createAvailability");
  cy.intercept("POST", "**/api/v1/time_off_requests").as("createTimeOff");
});

Given("giriş sayfasını açtım", () => {
  cy.visit("/login");
});

When("geçerli kimlik bilgileri ile formu gönderirim", () => {
  cy.get("[data-testid='login-email']").clear().type(credentials.email);
  cy.get("[data-testid='login-password']").clear().type(credentials.password);
  cy.get("[data-testid='login-submit']").click();
  cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
  cy.wait("@getShifts").its("response.statusCode").should("be.oneOf", [200, 304]);
});

Then("dashboard ekranını görmeliyim", () => {
  cy.url().should("include", "/dashboard");
  cy.contains("h1", "Dashboard").should("be.visible");
});

Then("özet kartları vardiya sayılarını göstermeli", () => {
  cy.get("[data-testid='stat-total-shifts']")
    .invoke("text")
    .should("match", /\d+/);
  cy.get("[data-testid='stat-upcoming-shifts']")
    .invoke("text")
    .should("match", /\d+/);
});

When("sol menüden {string} bağlantısını seçerim", (linkLabel: string) => {
  cy.contains("aside nav a", linkLabel).should("be.visible").click();
  if (linkLabel === "Vardiyalar") {
    cy.wait("@getShifts").its("response.statusCode").should("be.oneOf", [200, 304]);
  }
});

Then("vardiya tablosunda en az bir satır görmeliyim", () => {
  cy.get("[data-testid='shifts-table']").should("be.visible");
  cy.get("[data-testid='shifts-table'] tbody tr").its("length").should("be.gte", 1);
});

When("vardiya oluşturma formunu açarım", () => {
  cy.get("[data-testid='open-shift-dialog']").click();
});

When("vardiya bilgilerini doldururum", () => {
  const shiftTitle = `E2E Vardiyası ${Date.now()}`;
  const start = new Date(Date.now() + 90 * 60 * 1000);
  const end = new Date(Date.now() + 150 * 60 * 1000);
  const toInputValue = (date: Date) => date.toISOString().slice(0, 16);

  cy.wrap(shiftTitle).as("shiftTitle");
  cy.get("#title").clear().type(shiftTitle);
  cy.get("#location").clear().type("Kadıköy");
  cy.get("#starts_at").clear().type(toInputValue(start));
  cy.get("#ends_at").clear().type(toInputValue(end));
  cy.get("#notes").clear().type("E2E testi için oluşturuldu");
});

When("vardiya formunu gönderirim", () => {
  cy.get("[data-testid='create-shift-submit']").click();
});

Then("vardiya oluşturma isteği başarılı olmalı", () => {
  cy.wait("@createShift").its("response.statusCode").should("be.oneOf", [200, 201]);
  cy.wait("@getShifts").its("response.statusCode").should("be.oneOf", [200, 304]);
  cy.get("@shiftTitle").then((title) => {
    cy.contains("[data-testid='shifts-table'] tbody tr td", title as string).should("exist");
  });
});

When("müsaitlik formunu geçerli bilgilerle doldururum", () => {
  cy.get("#start_time").clear().type("09:00");
  cy.get("#end_time").clear().type("17:00");
});

When("müsaitlik formunu gönderirim", () => {
  cy.get("[data-testid='availability-submit']").click();
});

Then("müsaitlik isteği başarılı olmalı", () => {
  cy.wait("@createAvailability").its("response.statusCode").should("be.oneOf", [200, 201]);
  cy.contains("body", "Müsaitlik eklendi").should("be.visible");
});

When("izin talebi formunu geçerli bilgilerle doldururum", () => {
  const startDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const endDate = new Date(Date.now() + 8 * 24 * 60 * 60 * 1000);
  const toDateInput = (date: Date) => date.toISOString().slice(0, 10);

  cy.get("#start_date").clear().type(toDateInput(startDate));
  cy.get("#end_date").clear().type(toDateInput(endDate));
  cy.get("#reason").clear().type("Acil aile ziyareti - E2E testi");
});

When("izin talebi formunu gönderirim", () => {
  cy.get("[data-testid='timeoff-submit']").scrollIntoView().click({ force: true });
});

Then("izin talebi isteği başarılı olmalı", () => {
  cy.wait("@createTimeOff").its("response.statusCode").should("be.oneOf", [200, 201]);
  cy.contains("body", "İzin talebi oluşturuldu").should("be.visible");
});

Then("profil kartında oturum açan kullanıcının e-postası görünmeli", () => {
  cy.get("input#email").should("have.value", credentials.email);
});
