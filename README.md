# Gurucharan Vemuru - Portfolio

Responsive portfolio for full-stack and AI engineering, built as a static site with a Vercel serverless contact endpoint.

## Deploy with Vercel

Import this repository into Vercel. The `vercel.json` configuration serves the `dist` directory and Vercel detects the `api/contact.js` function.

Set `RESEND_API_KEY` and `CONTACT_FROM` in Vercel Project Settings > Environment Variables. `CONTACT_FROM` must use a verified sender domain in Resend. Contact form messages are delivered to gurucharanvemuru@gmail.com.

Never commit a real API key. See `DEPLOY.md` for details.