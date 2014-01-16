var magma = require('magma'),
  serviceName = 'sms-0.1';

magma.loadTree(__dirname, 'lib');

magma.service(serviceName, ['sms'], function(sms) {

    this.send = function(message, callback) {
      sms.send({
        to: message.data.to,
        body: message.data.body
      }, function(err, status) {
        if (err) {
          return callback(err);
        }

        // BEER: standardize codes/responses?
        callback(null, {message: 'Message sent!'});
      });
    };

  }
);
