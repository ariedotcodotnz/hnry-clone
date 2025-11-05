// Main application entry point - wires all components together

// 1. Import React for main app mounting
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// 2. Import Turbolinks for page navigation
import Turbolinks from "turbolinks";
Turbolinks.start();

// 3. Import and setup Stimulus controllers
import { Application } from "@hotwired/stimulus";
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers";

const stimulusApp = Application.start();
const context = require.context("./controllers", true, /\.js$/);
stimulusApp.load(definitionsFromContext(context));

// 4. Import Alpine.js and plugins
import "./libraries";

// 5. Import all view controllers
import "./views";

// 6. Import all WebSocket channels
import "./channels";

// 7. Import utilities and global helpers
import "./utilities";

// 8. Import ES utilities (provides window.initializeFormDisabledButtons and others)
import "./es_utilities";

// 9. Initialize Datadog monitoring
import "./datadog";

// 10. Import Bootstrap JavaScript and CSS
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./stylesheets/application.scss";

// 11. Setup global Hnry object for legacy code
if (typeof window !== "undefined") {
  window.Hnry = window.Hnry || {
    Config: {
      environment: process.env.NODE_ENV || "development",
      datadog_client_token: null,
      datadog_application_id: null,
      version: "1.0.0",
    },
    User: {
      id: null,
      email: null,
      full_name: null,
      jurisdiction: "NZ",
    },
  };

  // Routes object for API endpoints (used by views)
  // All routes point to backend at http://localhost:8000
  window.Routes = window.Routes || {
    // Home/Events
    page_loaded_event_home_index_path: () => "/home/index",
    entered_self_reconcile_modal_event_home_index_path: () => "/events/self_reconcile_modal",

    // Address API
    address_autocomplete_path: (params) => `/api/addresses/autocomplete?query=${encodeURIComponent(params.query)}`,
    address_details_path: (params) => `/api/addresses/details?google_place_id=${encodeURIComponent(params.google_place_id)}`,

    // Invoices API
    api_invoices_path: (id) => id ? `/api/invoices/${id}` : "/api/invoices",
    api_invoice_path: (id) => `/api/invoices/${id}`,
    api_invoice_invoices_send_path: (params) => `/api/invoices/${params.invoice_id}/send`,
    api_invoice_invoice_message_path: (invoiceId) => `/api/invoices/${invoiceId}/message`,

    // Quotes API
    api_quote_quote_message_path: (quoteId) => `/api/quotes/${quoteId}/message`,

    // Clients API
    clients_upload_create_path: () => "/api/clients/upload",
    payment_requests_path: () => "/api/payment_requests",

    // Services API
    services_upload_create_path: () => "/api/services/upload",
    get_price_breakdown_services_path: (params) => `/api/services/price_breakdown?price=${params.price}&sales_tax_type=${params.sales_tax_type}`,

    // Dashboard API
    api_dashboard_modules_path: () => "/api/dashboard/modules",

    // Allocation Preferences API
    allocation_preferences_path: () => "/api/allocation_preferences",
    get_active_clients_api_allocation_preferences_clients_path: () => "/api/allocation_preferences/clients",
    get_active_allocation_preferences_api_allocation_preferences_invoices_path: () => "/api/allocation_preferences/invoices",

    // Cards API
    send_card_details_cards_path: () => "/api/cards/send_card_details",
    update_card_cards_path: () => "/api/cards/update",
    withdraw_funds_cards_path: () => "/api/cards/withdraw_funds",

    // Vehicles API
    settings_vehicles_path: () => "/api/vehicles",
    api_vehicles_path: () => "/api/vehicles",
    settings_vehicle_path: (id) => `/api/vehicles/${id}`,

    // Financial Income Sources API
    api_financial_income_sources_path: () => "/api/financial_income_sources",
    api_financial_income_source_path: (id) => `/api/financial_income_sources/${id}`,

    // Bank Account Validation API
    api_bank_account_number_validation_validate_bank_account_number_path: () => "/api/bank_accounts/validate",

    // Expenses API
    expenses_job_categories_path: () => "/api/expenses/job_categories",

    // Reports API
    api_reports_income_expense_path: (params) => `/api/reports/income_expense?year_filter=${params.year_filter}`,

    // Users API
    api_app_users_features_path: () => "/api/users/features",
    api_app_users_feature_path: (feature) => `/api/users/features/${feature}`,
    api_users_features_path: () => "/api/users/features",
    api_user_path: (voidReason) => `/api/users/void?reason=${encodeURIComponent(voidReason)}`,

    // Settings API
    settings_pay_id_path: () => "/api/settings/pay_id",

    // Payees API (COP - Confirmation of Payee)
    payees_create_path: () => "/api/payees",

    // Tax Agency Authorisation API
    tax_agency_authorisation_path: (id) => `/api/tax_agency_authorisations/${id}`,

    // Off-boarding API
    off_boardings_path: () => "/api/off_boardings",

    // Dismissed Notifications API
    dismissed_notifications_path: () => "/api/dismissed_notifications",

    // Account Details Email API
    account_details_email_index_path: () => "/api/account_details_emails",

    // SCA Challenge API
    api_challenge_path: (params) => `/api/challenges/${params.challenge_id}`,

    // Starting Rates Calculator API
    get_starting_effective_tax_rate_starting_rates_calculator_index_path: (params) =>
      `/api/starting_rates_calculator/effective_tax_rate?income=${params.income}&jurisdiction=${params.jurisdiction}`,
    get_starting_student_loan_rate_starting_rates_calculator_index_path: (params) =>
      `/api/starting_rates_calculator/student_loan_rate?income=${params.income}&jurisdiction=${params.jurisdiction}`,
    get_starting_levies_rate_starting_rates_calculator_index_path: (params) =>
      `/api/starting_rates_calculator/levies_rate?income=${params.income}`,

    // Onboarding API - Personal Details
    api_onboarding_personal_details_path: () => "/api/onboarding/personal_details",
    api_onboarding_personal_detail_path: (userId) => `/api/onboarding/personal_details/${userId}`,

    // Onboarding API - Personal Contact Details
    api_onboarding_personal_contact_details_path: () => "/api/onboarding/personal_contact_details",
    api_onboarding_personal_contact_detail_path: (userId) => `/api/onboarding/personal_contact_details/${userId}`,

    // Onboarding API - Income Details
    api_onboarding_income_details_path: () => "/api/onboarding/income_details",

    // Onboarding API - Tax Details
    api_onboarding_tax_details_path: () => "/api/onboarding/tax_details",

    // Onboarding API - Work Details
    api_onboarding_work_details_path: () => "/api/onboarding/work_details",

    // Onboarding API - Confirm Your Income
    api_onboarding_confirm_your_income_path: () => "/api/onboarding/confirm_your_income",

    // Onboarding API - Self Employed Estimate
    api_onboarding_self_employed_estimate_index_path: () => "/api/onboarding/self_employed_estimate",

    // Onboarding API - Business Registration
    api_onboarding_business_registration_path: () => "/api/onboarding/business_registration",

    // Onboarding API - Personal Bank Account
    cop_submission_api_onboarding_personal_bank_accounts_path: () => "/api/onboarding/personal_bank_accounts/cop_submission",

    // Onboarding API - Choose ID Document
    api_onboarding_choose_an_id_document_path: () => "/api/onboarding/choose_an_id_document",

    // Onboarding API - Verify Identity
    api_onboarding_user_verification_path: (userId) => `/api/onboarding/user_verification/${userId}`,
    api_onboarding_verify_identity_basic_details_path: () => "/api/onboarding/verify_identity_basic_details",
    api_onboarding_verify_identity_external_verifications_path: () => "/api/onboarding/verify_identity_external_verifications",

    // Onboarding API - Authority to Verify Identity
    api_onboarding_authority_to_verify_identity_path: () => "/api/onboarding/authority_to_verify_identity",

    // Onboarding API - Proof of Address
    api_onboarding_proof_of_addresses_path: () => "/api/onboarding/proof_of_addresses",

    // Onboarding API - Card Opt-ins
    api_onboarding_card_opt_in_path: () => "/api/onboarding/card_opt_in",
    skip_card_opt_in_api_onboarding_card_opt_in_path: () => "/api/onboarding/card_opt_in/skip",

    // Onboarding API - Payment Confirmed
    api_onboarding_payment_confirmed_path: () => "/api/onboarding/payment_confirmed",

    // Onboarding API - Account Provisioned
    api_onboarding_account_provisioned_path: (userId) => userId ? `/api/onboarding/account_provisioned/${userId}` : "/api/onboarding/account_provisioned",

    // Onboarding API - Step Overview
    api_onboarding_step_overview_index_path: () => "/api/onboarding/step_overview",

    // Onboarding API - Resend Confirmation Email
    user_confirmation_path: () => "/api/users/confirmation",
    api_onboarding_resend_confirmation_email_index_path: () => "/api/onboarding/resend_confirmation_email",

    // Self Reconcile API
    api_self_reconcile_clients_path: () => "/api/self_reconcile/clients",
    api_self_reconcile_invoices_path: () => "/api/self_reconcile/invoices",
    api_self_reconcile_bank_transactions_path: (params) => `/api/self_reconcile/bank_transactions?query=${encodeURIComponent(params.query || '')}`,
    api_self_reconcile_bank_transaction_path: (id) => `/api/self_reconcile/bank_transactions/${id}`,
    api_self_reconcile_transaction_reconciliations_path: () => "/api/self_reconcile/transaction_reconciliations",
  };

  console.log("✅ Application initialized successfully");
}

// 12. Mount React App
// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");

  if (rootElement) {
    // Clear loading spinner
    rootElement.innerHTML = "";

    // Mount React app
    const root = createRoot(rootElement);
    root.render(<App />);

    console.log("✅ React app mounted successfully");
  }
});
