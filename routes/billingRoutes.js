const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
 const requireLogin = require('../middlewares/requireLogin');


module.exports = (app) => {
  app.post("/api/stripe", async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 500,
      currency: "inr",
      description: "$5 for 5 credits",
      payment_method_data: {
        type: "card",
        card: {
          token: req.body.id,
        },
      },
    //   automatic_payment_methods: {
    //     enabled: true,
    //     allow_redirects: 'never'
    //   //  return_url: 'http://localhost:3000/'
    // }
    
        
        
      confirmation_method: "manual",
      confirm: "true",
     return_url: 'http://localhost:3000/'
    });


    req.user.credits += 5;
 const user = await req.user.save();
 res.send(user);
// res.json({
//  user,
 // clientSecret:paymentIntent.client_secret
  // });
 
  //  console.log(paymentIntent);
  });
};




/*
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app =>{
app.post('/api/stripe',requireLogin, async (req,res) => {

 const charge = stripe.charges.create({
    amount : 5000,
    currency: 'usd',
    description: '$5 for 5 credits',
    source: req.body.id

 });
 
 req.user.credits += 5;
 const user = await req.user.save();
 res.send(user);
});
};
*/