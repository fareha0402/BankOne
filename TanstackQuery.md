
3. TanStack Query mutation
Handle pending, success and error states

4. Invalidate ['accounts']
Refresh cached balances after a successful paym

4. useQuery vs. useMutation
	useQuery	useMutation
Main purpose	Read or fetch data	Perform an operation that changes data
BankOne example	Fetch accounts	Submit payment
Starts automatically?	Usually, when the component needs the query	Usually, when you call mutate() or mutateAsync()
Cache behavior	Caches results by query key	Doesn't automatically refresh related query caches
Typical follow-up	Refetch when stale	Invalidate related queries on success
Remember this senior-level rule: a mutation does not automatically know which queries became outdated. You decide which query keys to invalidate based on the data that the operation may have changed.

For BankOne:
- Submit payment → useMutation
- Payment succeeds → invalidate ['accounts']
- Accounts refetch → show the latest balance returned by the backend