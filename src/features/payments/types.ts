export type PaymentRequest = {
  fromAccountId: string;
  beneficiaryName: string;
  amount: number;
};
export type PaymentResponse = {
  transactionId: string;
  status: 'success' | 'failure';
  message: string;
};