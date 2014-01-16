// magma is global
magma.require('twilio');

magma.module('sms', ['twilio', 'magma.config', 'console'], function(twilio, config, console) {

  var twilioConfig = config.useAll('sms:twilio', {
    // make sure to notify if not set
    accountSid: null,
    authToken: null
  });

  var longCode = config.use('sms:longCode', null);

  var twilioClient = twilio(twilioConfig.accountSid, twilioConfig.authToken);


  this.send = function(smsMessage, callback) {
    console.log('sending via Twilio', smsMessage);

    twilioClient.sendMessage({
      to: smsMessage.to,
      from: longCode,
      body: smsMessage.body
    }, function(err, responseData) {
      if (err) {
        console.log(serviceName + ' got an error from Twilio', err);
        return callback(err);
      }

      callback(null, true);
    });
  };

});