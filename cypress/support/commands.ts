/// <reference types="cypress" />

const defaultCredentials = {
  email: (Cypress.env("E2E_USER_EMAIL") as string) ?? "ceren+1@example.com",
  password: (Cypress.env("E2E_USER_PASSWORD") as string) ?? "Passw0rd!",
};

declare global {
  namespace Cypress {
    interface Chainable {
      loginViaApi: (email?: string, password?: string) => Chainable<void>;
    }
  }
}

Cypress.Commands.add("loginViaApi", (email, password) => {
  const credentials = {
    email: email ?? defaultCredentials.email,
    password: password ?? defaultCredentials.password,
  };

  const loginUrl = `${Cypress.env("API_URL")}/auth/login`;

  cy.request("POST", loginUrl, credentials).then(({ body }) => {
    const token = body?.token;
    if (!token) {
      throw new Error("API login response does not include a token");
    }

    cy.window().then((win) => {
      win.localStorage.setItem("auth_token", token);
      win.localStorage.setItem("user_email", credentials.email);
    });
  });
});

export {};
