import { useRef, useState } from "react";
import type { FormEvent } from "react";
import paymentsService from "./paymentsService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import accountsService from "../accounts/accountsService";

function Payments() {
  const [fromAccountId, setFromAccountId] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const isSubmittingRef = useRef(false);

  const {
    data: accounts,
    isPending: isAccountsLoading,
    isError: isAccountsError,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: () => accountsService.getAccounts(),
  });
  const validateForm = () => {
    const numericAmount = Number(amount);
    if (!fromAccountId) {
      setError("Please select a source account.");
      return false;
    }
    if (!beneficiaryName || beneficiaryName.trim() === "") {
      setError("Please enter the beneficiary name.");
      return false;
    }
    if (
      amount.trim() === "" ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      setError("Please enter a valid payment amount.");
      return false;
    }
    return true;
  };
  const paymentMutation = useMutation({
    mutationFn: paymentsService.submitPayment,

    onSuccess: async () => {
      setError(null);
      setFromAccountId("");
      setBeneficiaryName("");
      setAmount("");
      await queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });
  const submitPayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmittingRef.current || paymentMutation.isPending) return;
    isSubmittingRef.current = true;
    try {
      if (!validateForm()) return;

      paymentMutation.mutate({
        fromAccountId,
        beneficiaryName: beneficiaryName.trim(),
        amount: Number(amount),
      });
    } finally {
      isSubmittingRef.current = false;
    }
  };
  return (
    <div>
      <form onSubmit={submitPayment}>
        {error && (
          <p role="alert" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <label>
          From Account:
          {isAccountsLoading && <p>Loading accounts...</p>}
          {isAccountsError && (
            <p role="alert" style={{ color: "red" }}>
              Error loading accounts. Please try again.
            </p>
          )}
          <select
            name="fromAccountId"
            value={fromAccountId}
            disabled={isAccountsLoading || isAccountsError}
            onChange={(e) => {
              setFromAccountId(e.target.value);
              setError(null);
              paymentMutation.reset(); // Reset mutation state when user changes input
            }}
            required
          >
            <option value="">Select an account</option>
            {accounts?.map((account) => (
              <option key={account.accountNumber} value={account.accountNumber}>
                {account.accountNumber} - {account.accountType}
              </option>
            ))}
          </select>
        </label>
        <label>
          Beneficiary Name:
          <input
            type="text"
            name="beneficiaryName"
            value={beneficiaryName}
            onChange={(e) => {
              setBeneficiaryName(e.target.value);
              setError(null);
              paymentMutation.reset(); // Reset mutation state when user changes input
            }}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError(null);
              paymentMutation.reset(); // Reset mutation state when user changes input
            }}
            required
            min="0.01"
            step="0.01"
          />
        </label>
        {/* This improves the user experience by preventing repeated clicks while a request is in progress.
         A production payment system should also enforce idempotency on the backend to prevent duplicate transactions. */}
        <button type="submit" disabled={paymentMutation.isPending}>
          {paymentMutation.isPending
            ? "Processing payment..."
            : "Submit Payment"}
        </button>
        {paymentMutation.isError && (
          <p role="alert" style={{ color: "red" }}>
            {paymentMutation.error instanceof Error
              ? paymentMutation.error.message
              : "Error submitting payment. Please try again."}
          </p>
        )}
        {paymentMutation.isSuccess && (
          <p role="status" style={{ color: "green" }}>
            Payment submitted successfully! Transaction ID:{" "}
            {paymentMutation.data?.transactionId}
          </p>
        )}
      </form>
    </div>
  );
}
export default Payments;
