const Subscription = require('../models/Subscription');

const plans = {
  premium: {
    label: 'Premium',
    amount: 500000,
    plan: 'premium'
  },
  pro: {
    label: 'Pro',
    amount: 1500000,
    plan: 'pro'
  }
};

const paystackRequest = async (path, options = {}) => {
  if (!process.env.PAYSTACK_SECRET_KEY) {
    throw new Error('Paystack is not configured. Add PAYSTACK_SECRET_KEY to your server .env file.');
  }

  const response = await fetch(`https://api.paystack.co${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const data = await response.json();
  if (!response.ok || data.status === false) {
    throw new Error(data.message || 'Paystack request failed');
  }

  return data;
};

exports.createCheckoutSession = async (req, res) => {
  try {
    const { plan } = req.body;
    const selectedPlan = plans[plan];

    if (!selectedPlan) {
      return res.status(400).json({ message: 'Invalid plan' });
    }

    const callbackUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/dashboard`;
    const data = await paystackRequest('/transaction/initialize', {
      method: 'POST',
      body: JSON.stringify({
        email: req.user.email,
        amount: selectedPlan.amount,
        currency: 'NGN',
        callback_url: callbackUrl,
        metadata: {
          userId: req.user.id,
          plan: selectedPlan.plan,
          planLabel: selectedPlan.label
        }
      })
    });

    res.json({
      provider: 'paystack',
      authorizationUrl: data.data.authorization_url,
      accessCode: data.data.access_code,
      reference: data.data.reference
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSubscription = async (req, res) => {
  try {
    const { reference, sessionId } = req.body;
    const paymentReference = reference || sessionId;

    if (!paymentReference) {
      return res.status(400).json({ message: 'Payment reference is required' });
    }

    const data = await paystackRequest(`/transaction/verify/${encodeURIComponent(paymentReference)}`);
    const transaction = data.data;

    if (transaction.status !== 'success') {
      return res.status(400).json({ message: 'Payment was not successful' });
    }

    const metadata = transaction.metadata || {};
    if (metadata.userId && metadata.userId.toString() !== req.user.id.toString()) {
      return res.status(400).json({ message: 'Invalid payment reference for this user' });
    }

    const selectedPlan = plans[metadata.plan] || plans.premium;
    const [subscription] = await Subscription.upsert({
      userId: req.user.id,
      plan: selectedPlan.plan,
      paymentProvider: 'paystack',
      paymentReference,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      startDate: new Date(),
      isActive: true
    });

    res.json({ message: 'Subscription activated successfully', subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ where: { userId: req.user.id } });
    res.json(subscription || { plan: 'free', isActive: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
