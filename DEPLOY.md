# Vercel deployment and contact email

This repository contains a static site in `dist` and a Vercel serverless function in `api/contact.js`.

## Deploy

Import `gvemuru1/portfolio` into Vercel. Set the project root to this repository root. The `vercel.json` file points the static output to `dist`, while Vercel detects the API function under `api`.

## Enable contact email

1. Create a Resend API key and verify a sender domain.
2. In Vercel Project Settings > Environment Variables, add `RESEND_API_KEY` and `CONTACT_FROM` for Production. Set `CONTACT_FROM` to a sender address on the verified domain.
3. Redeploy after saving the variables.

Contact messages will go to `gurucharanvemuru@gmail.com`, with the visitor's address as Reply-To. Until the Resend variables are configured, the form reports that delivery is unavailable and shows the direct email fallback.

Never commit a real API key. `.env.example` lists the required variable names.
