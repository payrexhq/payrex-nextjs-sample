import type { Metadata } from 'next';
import PaymentForm from "./PaymentForm";
import Payrex from "payrex-node";

export default async function Page() {
  let paymentIntentClientSecret;

  try {
    // Replace this with your PayRex Secret API key.
    const payrex = new Payrex('sk_test_....')
    const response = await payrex.paymentIntents.create({
      currency: 'PHP',
      payment_methods: ['card', 'gcash'],
      amount: 15000
    })

    paymentIntentClientSecret = response.clientSecret
  } catch (e) {
    console.error(e)
  }

  return <>
    <PaymentForm paymentIntentClientSecret={paymentIntentClientSecret} />
  </>
  
}

export const metadata: Metadata = {
  title: "Sample Payment Demo of PayRex"
};