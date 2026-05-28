const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Subscription = require('../models/Subscription');

exports.createCheckoutSession = async (req, res) => {
  try {
    const { plan } = req.body;

    const prices = {
      premium: process.env.STRIPE_PREMIUM_PRICE_ID,
      pro: process.env.STRIPE_PRO_PRICE_ID
    };

    if (!prices[plan]) {
      return res.status(400).json({ message: 'Invalid plan' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: prices[plan], quantity: 1 }],
      success_url: `${process.env.CLIENT_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/pricing`,
      client_reference_id: req.user.id.toString()
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSubscription = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.client_reference_id !== req.user.id.toString()) {
      return res.status(400).json({ message: 'Invalid session' });
    }

    const [subscription] = await Subscription.upsert({
      userId: req.user.id,
      plan: session.metadata?.plan || 'premium',
      stripeCustomerId: session.customer,
      stripeSubscriptionId: session.subscription,
      startDate: new Date(),
      isActive: true
    });

    res.json({ message: 'Subscription created successfully', subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ where: { userId: req.user.id } });
    res.json(subscription || { plan: 'free' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
