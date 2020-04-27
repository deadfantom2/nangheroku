module.exports = {
  subjectLink: "Account activation link",
  subjectForgot: "Restore your password from your email",
  subjectReset: "Your password has been changed",
  messageLink: "Activation link email has been sent",
  messageForgot: "A forgot email has been sent",
  messageReset:
    "Success! The password has been changed correctly. Confirmation mail has been sent to you!",
};

module.exports.mail_text = (property, text) => {
  if (property === "register") {
    return (
      "Hello,\n\n" +
      "Please verify your account by clicking the link: \nhttp://localhost:4200" +
      "/confirmation/" +
      text +
      "\n"
    );
  }
  if (property === "forgot") {
    return `Vous recevez cet e-mail parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe pour votre compte.\n\n
      Veuillez cliquer sur le lien suivant, ou collez-le dans votre navigateur pour terminer le processus:\n\n
      http://localhost:4200/reset/${text}\n\n
      Si vous ne l'avez pas demandé, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.\n`;
  }
  if (property === "reset") {
    return `Hello,\n\nThis is a confirmation that the password for your account ${text} has just been changed.\n`;
  }
};
