import express from 'express'
import cors from 'cors'
import router from './routes/index.js'
import passport from 'passport'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import Stripe from 'stripe'
import Order from './model/Order.js'

config()
const app=express()



/***====WEBHOOK====**** */
// const stripe = new Stripe('sk_test_51OxNxSSFywokjVqA9IWuQvmZhBjzpaZeoAHcpOP0GDp94EvD7Nh7xI4S7V8yo2kkmbobGOCbu6hQ7i4r5VO6C5uX00HqDhiOog');
const stripe = new Stripe(process.env.STRIPE_SECRET);

const endpointSecret = process.env.ENDPOINT_SECRET;

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;

        const order = await Order.findById(
          paymentIntentSucceeded.metadata.orderId
        );
        order.paymentStatus = 'received';
        await order.save();

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);
/***============***** */




app.use(cors({
    // origin:'http://localhost:5173',
    credentials:true,
    exposedHeaders:['X-Total-Count']
}))
app.use(express.json())


app.use(cookieParser(process.env.COOKIE_SECRET))
app.use('/api/v1',router)






/*******======****** */


// // This is your test secret API key.
// const stripe = new Stripe('sk_test_51OxNxSSFywokjVqA9IWuQvmZhBjzpaZeoAHcpOP0GDp94EvD7Nh7xI4S7V8yo2kkmbobGOCbu6hQ7i4r5VO6C5uX00HqDhiOog');

// // app.use(express.static("public"));
// // app.use(express.json());

// // const calculateOrderAmount = (items) => {
// //   // Replace this constant with a calculation of the order's amount
// //   // Calculate the order total on the server to prevent
// //   // people from directly manipulating the amount on the client
// //   return 1400;
// // };

// app.post("/create-payment-intent", async (req, res) => {
// //   const { items } = req.body;
//   const { totalAmount } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     // amount: calculateOrderAmount(items),
//     amount:totalAmount*100,
//     currency: "inr",
//     // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });


/*******======****** */




export default app;