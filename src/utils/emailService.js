const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendPasswordSetupEmail(email, setupToken) {
    const setupUrl = `${process.env.FRONTEND_URL}/setup-password?token=${setupToken}`;
    
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Configurez votre mot de passe',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Bienvenue!</h2>
          <p>Un compte a été créé pour vous. Pour commencer à utiliser votre compte, vous devez configurer votre mot de passe.</p>
          <p>Cliquez sur le lien ci-dessous pour configurer votre mot de passe:</p>
          <a href="${setupUrl}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">
            Configurer mon mot de passe
          </a>
          <p style="color: #666; font-size: 14px;">
            Ce lien expirera dans 24 heures pour des raisons de sécurité.
          </p>
          <p style="color: #666; font-size: 14px;">
            Si vous n'arrivez pas à cliquer sur le lien, copiez et collez cette URL dans votre navigateur:<br>
            ${setupUrl}
          </p>
        </div>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Password setup email sent to ${email}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send setup email');
    }
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log('SMTP connection verified successfully');
      return true;
    } catch (error) {
      console.error('SMTP connection failed:', error);
      return false;
    }
  }
}

module.exports = new EmailService();
