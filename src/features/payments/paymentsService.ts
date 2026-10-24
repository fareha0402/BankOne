import type { PaymentRequest ,PaymentResponse} from "./types";

class PaymentsService {
    async submitPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if(paymentData.beneficiaryName.trim().toLowerCase() === "fail"){
            throw new Error("Payment could not be processed.");
        } else {
        return {
            transactionId: 'TXN-1001',
            status: 'success',
            message: 'Payment submitted successfully',
        };
    }
}
}
export default new PaymentsService();