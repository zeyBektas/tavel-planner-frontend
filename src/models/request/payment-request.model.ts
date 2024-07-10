export interface PaymentRequest {
  routeId: string;
  creditCard: {
    cardNumber: string;
    userId: string;
    holderName: string;
    holderSurname: string;
    cvv: string;
    expirationDate: string;
  };
}
