var sendgrid  = require('sendgrid')('lousylandlord', 'pEqUbxRxofunqYFvu9rUHt2WEsKryLLnjxkkdxD');

module.exports = {
  notify: function (req) {
    var params = req.body;
    var email     = new sendgrid.Email({
      to:       process.env.LLL_CONTACT_EMAIL || 'devon.ring@gmail.com' ,
      from:     'concern@lousylandlord.ca',
      subject:  'Contact',
      text: JSON.stringify(params)
    });
    console.log(email);
    sendgrid.send(email, function(err, json) {
      if (err) { return console.error(err); }
      console.log('Email sent', json);
    });
  }
}
