const express = require("express");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = ["https://mail.google.com/"];

// Route 1: Start Google OAuth
app.get("/auth", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });
  res.redirect(authUrl);
});

// Route 2: Google redirects back here
app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oAuth2Client.getToken(code);
  console.log("Tokens:", tokens);
  res.send("✅ Refresh token printed in console, copy it!");
});

app.listen(5001, () =>
  console.log("Server running → http://localhost:5001/auth")
);
