import React from "react";
import ConfirmationSection from './ConfirmationSection'

type RedirectPageType = {
  searchParams: {
    payment_intent_client_secret: string;
  };
};

const Page: React.FC<RedirectPageType> = async ({ searchParams }) => {
  return <ConfirmationSection paymentIntentClientSecret={searchParams.payment_intent_client_secret} />
};

export default Page;
