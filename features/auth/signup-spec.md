# Feature: User Authentication - Signup

## Overview
Allow new users to create an account to access Dutch Lingo.

## User Story
As a **new user**, I want to **create an account with email and password** so that **I can start learning Dutch vocabulary**.

## Acceptance Criteria
- [ ] User can navigate to signup screen
- [ ] User can enter name, email, and password
- [ ] Form validates email format
- [ ] Form validates password strength (min 8 chars, 1 uppercase, 1 number)
- [ ] Password confirmation matches
- [ ] Shows error for existing email
- [ ] Redirects to onboarding after success
- [ ] Loading state during signup
- [ ] Terms & conditions checkbox

## Test Files
- `tests/e2e/auth/signup.spec.ts` - E2E tests
