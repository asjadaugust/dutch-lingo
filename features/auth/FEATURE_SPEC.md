# Feature: User Authentication - Login

## Overview
Allow users to authenticate with email/password to access the Dutch Lingo app.

## User Story
As a **Dutch language learner**, I want to **login with my email and password** so that **I can access my personalized learning progress**.

## Acceptance Criteria
- [ ] User can navigate to login screen
- [ ] User can enter email and password
- [ ] Form validates email format
- [ ] Password field is masked
- [ ] Shows error for invalid credentials
- [ ] Redirects to home/dashboard on success
- [ ] Displays loading state during authentication
- [ ] Form validates empty fields

## Test Files
- `tests/e2e/auth/login.spec.ts` - E2E tests
