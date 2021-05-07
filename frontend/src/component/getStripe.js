import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51IkWLXCmldA3mk4tzuY3BBkZezNYUpLpBLHESZvorBTJX6uJ7Sn8WHOe923Ry75Q5p0b2NMubw22kYbnNH8rbb0D00i7PEj4Sq"
    );
  }
  return stripePromise;
};

export default getStripe;
