const { secrets, coinPaymentsKey: key } = require('config');
const Coinpayments = require('coinpayments');
const client = new Coinpayments({ key, secret: secrets.coinPayments });

module.exports = client;
