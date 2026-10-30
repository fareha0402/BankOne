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


Payements.tsx
useRef

how isSubmittingRef helps
isSubmittingRef helps us prevent the same payment from being submitted twice before React has updated the UI.

Let's understand this using your BankOne Payments feature.

1. The problem without useRef
Suppose the user double-clicks Submit very quickly.

First click calls submitPayment().

Payment request starts.

React hasn't rendered the disabled button yet.

Second click calls submitPayment() again.

A second payment request may start.

Your existing check:

if (paymentMutation.isPending) return;

is useful, but it reads the mutation state from the current render. It isn't a guaranteed synchronous lock between rapid events.

2. How useRef solves this
We create a ref:

const isSubmittingRef = useRef(false);

Think of it as a small lock stored inside your component.

false = payment submission is allowed.

true = payment submission is already in progress.

Inside your handler, the logic will be:

if (isSubmittingRef.current) return;

isSubmittingRef.current = true;

The important part is that changing .current happens synchronously.

Visualize two rapid clicks

First click

Allowed
Ref is false. Set it to true and start the request.

Second click

Blocked
Ref is true. Return without starting another request.

One request initiated
3. Why not useState?
useState

useRef

Updating schedules a re-render

Updating doesn't trigger a re-render

UI-related data

Non-UI operational data

State updates are applied through React's rendering process

.current changes immediately

Good for displaying loading status

Good for synchronous locking

In our case:

paymentMutation.isPending controls the Processing button UI.

isSubmittingRef.current provides the synchronous submission lock.

They serve different purposes.

4. What happens when the request finishes?
We must release the lock regardless of success or failure.

That's why JavaScript's finally is useful:

try {
  // Submit payment
} finally {
  isSubmittingRef.current = false;
}

If we don't reset it, the user cannot submit another payment.

For a real banking system, the backend must additionally enforce idempotency. A frontend ref cannot guarantee exactly-once processing across multiple tabs, retries or network failures.