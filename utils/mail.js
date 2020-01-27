var nodemailer = require("nodemailer");

exports.mailMessage = (email, subject, text, message, res) => {

  var sender = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 465,
    // auth: {
    //   user: "ynovnanterne@gmail.com",
    //   pass: "ynov_nanterne"
    // }
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "db686c08b06123",
      pass: "808ea3165a495f"
    }
  });
  var mailOptions = {
    from: "ynovnanterne@gmail.com",
    to: email,
    subject: subject,
    text: text
  };
  sender.sendMail(mailOptions, function(err) {
    if (err) {
      console.log(err.responseCode);
      res.json({ success: false, message: "email config " + err.message });
    } else {
      res.send({ success: true, message: message });
    }
  });
};
