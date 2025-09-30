import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        console.log(err)
        reject('Failed to create access token');
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      type: 'OAuth2',
      user: process.env.GOOGLE_SENDER_EMAIL,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken as string
    }
  });

  return transporter;
};

export const sendOTPEmail = async (email: string, otp: string) => {
  try {
    const transporter = await createTransporter();
    
    const mailOptions = {
      from: process.env.GOOGLE_SENDER_EMAIL,
      to: email,
      subject: 'Your OTP for Requip',
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>Your OTP for Requip</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4; padding: 40px 0;">
              <tr>
                <td>
                  <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    <tr style="background-color: #3E82F8;">
                      <td style="padding: 30px 40px; text-align: center; color: #ffffff;">
                        <h1 style="margin: 0; font-family: 'Ethnocentric', sans-serif; font-size: 28px; letter-spacing: 1px;">REQUIP</h1>
                        <p style="margin: 5px 0 0; font-size: 14px;">Authentication OTP</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 30px 40px; color: #333333;">
                        <h2 style="margin: 0 0 15px; font-size: 22px;">Welcome to Requip!</h2>
                        <p style="margin: 0 0 15px; font-size: 16px;">Your OTP for authentication is:</p>
                        <p style="margin: 0 0 25px; font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #3E82F8;">${otp}</p>
                        <p style="margin: 0 0 10px; font-size: 14px; color: #555;">This OTP will expire in 10 minutes.</p>
                        <p style="margin: 0 0 0; font-size: 13px; color: #999;">If you didn't request this OTP, please ignore this email.</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="background-color: #fafafa; padding: 20px 40px; text-align: center; font-size: 12px; color: #aaa;">
                        <p style="margin: 0;">&copy; ${new Date().getFullYear()} REQUIP. All rights reserved.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}; 