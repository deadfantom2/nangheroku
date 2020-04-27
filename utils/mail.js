const nodemailer = require("nodemailer");

exports.mailMessage = async (email, subject, text, message, res) => {
  try {
    var sender = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {},
    });
    var mailOptions = {
      from: "ynovnanterne@gmail.com",
      to: email,
      subject: subject,
      text: text,
    };
    await sender.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: message });
  } catch (error) {
    console.log("error: ", error);
  }
};
