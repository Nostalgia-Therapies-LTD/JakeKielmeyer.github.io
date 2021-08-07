import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_live_51IkWLXCmldA3mk4tMaDBD8I2RKT65tcH0eoNXlcJsG6KhJPCuVWxxjjRsoYUw1n3D16mWzvHkwJH5USHGXEHgmZa006p9PV7aB"
    );
  }
  return stripePromise;
};

export default getStripe;
