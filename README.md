# 🌙 Vardiya Flow – Cypress Test Suite

This repository contains the **End-to-End (E2E) test automation suite** developed for the **Lovable-based Vardiya Flow Frontend** project.  
The main application is a modern web platform for managing **shift schedules, employee assignments, leaves, and availability**.  
This Cypress suite validates both **UI workflows** and **API integrations**, ensuring that all core features behave reliably across updates.

---

## 🎯 Project Purpose

> Created as part of the *Software Development and Testing (SDP)* course to design a complete, automated test framework for a real SaaS-style system.

The main objectives are to:
- Verify user interactions and system flows automatically  
- Reduce manual testing time and improve release confidence  
- Build a scalable Cypress-based automation framework usable across teams  

---

## 🧩 Test Coverage

### 🔐 1. Authentication
- Valid / invalid login form validation  
- Token generation and session handling  

### 🧭 2. Navigation
- Sidebar and route navigation checks  
- Visibility of menus based on user roles  

### 🕒 3. Shift Management
- Creating, updating, and deleting shifts  
- Assigning employees to shifts  
- Verifying correct API responses and status codes  

### 📡 4. API Integration
- Direct API request / response assertions via Cypress  
- Network monitoring and response time validation  

---

## ⚙️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Cypress** | E2E test automation |
| **TypeScript** | Type-safe and clean test logic |
| **BDD (Cucumber)** | Behavior-driven test scenarios |
| **Node.js / npm** | Test environment and package management |
| **Postman (integration)** | API validation and reference |

---

## 🚀 Setup

```bash
# Install dependencies
npm install
Run in headless mode:
bash
Kodu kopyala
npm test
Run in GUI mode:
bash
Kodu kopyala
npm run cy:open
📊 Reporting & Output
Videos: cypress/videos/

Screenshots: cypress/screenshots/

Optional HTML reports can be generated with htmlextra or cucumber-json reporters.

🧠 Learning Outcomes
Through this project, we explored:

Building a real Cypress test structure for production-grade apps

Writing maintainable, behavior-driven scenarios (BDD)

Integrating UI and API testing under a unified framework

This suite demonstrates how Cypress can be used for full-stack verification — from visual regression to API contract testing — and reflects a professional QA workflow.
