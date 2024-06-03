"use client";

import { useEffect , useState} from "react";
import { loadPayrex } from "payrex-js";

type ConfirmationSectionType = {
  paymentIntentClientSecret: string;
}

const ConfirmationSection:React.FC<ConfirmationSectionType> = ({paymentIntentClientSecret}) => {
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const initializePayrex = async () => {
      try {
        // Replace this with your PayRex Public API Key
        const payrex = await loadPayrex('pk_test_...');
        const paymentIntent = await payrex.getPaymentIntent(paymentIntentClientSecret);

        let paymentStatus;

        if(paymentIntent.status === "succeeded") {
          paymentStatus = 'paid';
        } else {
          paymentStatus = 'failed';
        }

        setStatus(paymentStatus)
      } catch(e) {
        console.error(e);
      }
    }

    initializePayrex();
  }, [])

  let component;

  switch(status) {
    case "pending":
      component = <span>Loading data...</span>

      break;
    case "paid":
      component = <span>Successfully paid the transaction.</span>

      break;
    case "failed":
      component = <span>There is a problem completing the payment.</span>

      break;
  }

  return <div>
    {component}
  </div>
};

export default ConfirmationSection;