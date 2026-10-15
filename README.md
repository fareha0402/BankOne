`useEffect` is used to synchronize a component with external systems, such as APIs. For example, in my Accounts page, I use it to fetch account data when the component mounts, and I specify dependencies to control when the effect runs again.

The effect callback itself should not be async because an async function returns a Promise, but React expects the callback to return either nothing or a cleanup function. Instead, I define an async function inside the effect and invoke it. I also handle loading, error, and success states so the UI responds correctly to the API lifecycle.

Interview follow-up
Suppose the user navigates away from Accounts and immediately returns, and two API requests are now in flight.
Question: The older request takes 3 seconds, while the newer request takes 1 second. The newer response arrives first, followed by the older response.
How would you prevent the older response from overwriting the newer account data?
Explain your approach first; don't write the code yet.


Option A: AbortController + useEffect
Manual control
You write the request lifecycle yourself: loading, errors, cancellation, storing results, and deciding when to refetch.
Best when the requirement is simple or you need precise control over a particular request.




Option B: TanStack Query
Server-state management
The library manages caching, loading and error states, refetching, request deduplication, and cache updates. It also provides an AbortSignal to your query function.
Best when multiple pages and components depend on API data

For a simple API request, I can use `useEffect` with `AbortController` to manage the request lifecycle and cancel obsolete requests during cleanup. However, I need to implement loading states, error handling, caching, and refetching myself.

For a larger application like BankOne, where account data may be shared across pages and needs refreshing after payments or other mutations, I would consider TanStack Query. It provides caching, query invalidation, loading and error states, and request cancellation through AbortSignal.

I would choose based on the complexity of server-state management rather than using a library for every API call.