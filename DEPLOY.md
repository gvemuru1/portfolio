# Vercel deployment and contact email

The portfolio is a static site in `dist`, with a Vercel serverless function in `api/contact.js`.

1. Create a GitHub repository for this portfolio and push this folder's contents.
2. Import that repository into Vercel. Set the Root Directory to the portfolio repository root. `vercel.json` points the static output to `dist`.
3. In Resend, create an API key and verify a sender domain. Set `RESEND_API_KEY` and `CONTACT_FROM` in Vercel Project Settings > Environment Variables for Production (and Preview if needed). `CONTACT_FROM` must use the verified domain.
4. Redeploy after adding the variables. Contact form submissions will be emailed to `gurucharanvemuru@gmail.com`, with the visitor's address as Reply-To.

Do not commit a real API key. `.env.example` documents the variable names only.

No Git remote is configured in the current workspace, so the portfolio has not been pushed. The two repository URLs provided are project repositories, not a portfolio repository.
