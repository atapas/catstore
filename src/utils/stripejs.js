import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = (publishKey) => {
  if (!stripePromise) {
    stripePromise = loadStripe(publishKey);
  }
  return stripePromise;
}

export default getStripe;