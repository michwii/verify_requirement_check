const {dialogflow, DeliveryAddress, TransactionRequirements, TransactionDecision, Suggestions} = require('actions-on-google');
const functions = require('firebase-functions');

const app = dialogflow({debug: false});

app.intent('verify_transaction_requirements', (conv) => {
  console.log("verify transaction requirements");
  conv.ask(new TransactionRequirements({
    orderOptions: {
      requestDeliveryAddress: false,
    },
    paymentOptions: {
      googleProvidedOptions: {
        prepaidCardDisallowed: false,
        supportedCardNetworks: ['VISA', 'AMEX'],
        // These will be provided by payment processor,
        // like Stripe, Braintree, or Vantiv.
        tokenizationParameters: {}
      }
    }
  }));
});

app.intent('verify_transaction_requirements_response', (conv) => {
  console.log("verify transaction requirements response");
  const arg = conv.arguments.get('TRANSACTION_REQUIREMENTS_CHECK_RESULT');
  if (arg && arg.resultType ==='OK') {
    // Normally take the user through cart building flow
    conv.ask("I have all the requirements");
  } else {
    conv.close("User has refused the requirements");
  }
});

module.exports = app;
