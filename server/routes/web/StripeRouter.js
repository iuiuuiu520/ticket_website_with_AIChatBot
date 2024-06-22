var express = require('express')
var StripeRouter = express.Router()
const stripe = require('stripe')('sk_test_51PRTUVRwA1pQOuKx1FMlZ3DKH0h3AnTeJ71eoMVdkeSGvRLXgFS3cGCCUehH57SjWJ8fQMHa4yURfYxm6ydqixRg00iXIs1lu3')

StripeRouter.post('/webapi/create-checkout-session', async (req, res) => {
    const { quantity } = req.body
    const lineItems = [
      {
        price: 'price_1PRYgKRwA1pQOuKxmCoySR4U',
        quantity: quantity
      }
    ]
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: 'http://localhost:8080/success',
      cancel_url: 'http://localhost:8080'
    })
  
    console.log(session)
  
    res.send({
      url : session.url
    })
  })


module.exports = StripeRouter;