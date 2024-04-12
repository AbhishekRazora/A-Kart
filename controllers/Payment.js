import Stripe from 'stripe'
// const stripe = new Stripe('sk_test_51OxNxSSFywokjVqA9IWuQvmZhBjzpaZeoAHcpOP0GDp94EvD7Nh7xI4S7V8yo2kkmbobGOCbu6hQ7i4r5VO6C5uX00HqDhiOog');
const stripe = new Stripe(process.env.STRIPE_SECRET);

export const createPaymentIntent=async (req, res) => {
    //   const { items } = req.body;
      const { totalAmount,orderId } = req.body;
    
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        // amount: calculateOrderAmount(items),
        amount:totalAmount*100,
        currency: "inr",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
        metadata:{
          orderId
        }
      });
    
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    }