Be ready to explain this: queryKey identifies the cached data, while queryFn tells TanStack Query how to fetch it. When account data changes, you can invalidate ['accounts'] with queryClient.invalidateQueries() so the relevant query can refresh.

Let's set up Vitest + React Testing Library for BankOne. This is a good fit for your React + TypeScript + Vite project, and it's useful experience for senior frontend interviews.

Choosing between Jest and Vitest comes down to your project's build tool chain. While Jest remains the mature, industry-standard choice for legacy and Webpack-based systems, Vitest has become the go-to runner for modern ESM and Vite-driven applications. Because Vitest mirrors Jest’s API, migrating or switching between them requires very little relearning.

Direct Comparison


Feature / Metric	Jest	Vitest
Primary Engine	Custom Babel / ts-jest	Powered natively by Vite
ESM & TypeScript	Requires heavy config / transformers	Native, zero-config out-of-the-box
Watch Mode	File-system polling (can be slower)	Instant Hot Module Replacement (HMR)
Ecosystem Maturity	Massively mature; massive plugin library	Rapidly growing; mostly Jest-compatible
Unique Capabilities	Snapshot serializers; massive enterprise trust	In-source testing, Type testing, Browser UI dashboard


npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
Package	Purpose
vitest	Runs your tests
jsdom	Simulates a browser DOM in Node
@testing-library/react	Renders React components for testing
@testing-library/jest-dom	Provides readable DOM assertions
@testing-library/user-event	Simulates user interactions


2.Payments Page
1. Payment form
Select source account, enter beneficiary and amount

2. Payment service
Validate input and submit the payment

3. TanStack Query mutation
Handle pending, success and error states

4. Invalidate ['accounts']
Refresh cached balances after a successful paym


1. Simple form vs. form library
Criteria	Simple React form	React Hook Form + Zod
Learning React fundamentals	Excellent	Some abstraction
Small forms	Ideal	Works well
Complex validation	More manual code	Easier to maintain
Large enterprise forms	Can become cumbersome	Better suited
BankOne right now	Start here	Add later