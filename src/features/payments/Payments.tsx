import { useState } from "react";
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

  const { data: accounts,
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
      await queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });
  const submitPayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // Implementation for submitting payment
    console.log({ fromAccountId, beneficiaryName, amount });
    paymentMutation.mutate({
      fromAccountId,
      beneficiaryName: beneficiaryName.trim(),
      amount: Number(amount),
    });
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
          <select
            name="fromAccountId"
            value={fromAccountId}
            onChange={(e) => {
              setFromAccountId(e.target.value);
              setError(null);
            }}
            required
          >
            <option value="">Select an account</option>
           {accounts?.map(((account) => (
            <option key={account.accountNumber} value={account.accountNumber}>
              {account.accountNumber} - {account.accountType}
            </option>
           )))}
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
              setError(null)
            }}
            required
          />
        </label>
        {/* This improves the user experience by preventing repeated clicks while a request is in progress.
         A production payment system should also enforce idempotency on the backend to prevent duplicate transactions. */}
        {paymentMutation.isPending ? (
          <p>Processing payment...</p>
        ) : (
          <button type="submit">Submit Payment</button>
        )}
        {paymentMutation.isError && (
          <p role="alert" style={{ color: "red" }}>
            {(paymentMutation.error as Error).message ||
              "Error submitting payment. Please try again."}
          </p>
        )}
        {paymentMutation.isSuccess && (
          <p role="alert" style={{ color: "green" }}>
            Payment submitted successfully! Transaction ID:{" "}
            {paymentMutation.data?.transactionId}
          </p>
        )}
      </form>
    </div>
  );
}
export default Payments;
