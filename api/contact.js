const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, message } = req.body || {};
  if (typeof name !== 'string' || name.trim().length < 1 || name.length > 100 ||
      typeof email !== 'string' || email.length > 254 || !EMAIL_RE.test(email) ||
      typeof message !== 'string' || message.trim().length < 5 || message.length > 5000) {
    return res.status(400).json({ error: 'Please enter a name, valid email, and message.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !from) {
    return res.status(503).json({ error: 'Email delivery is not configured yet. Please email Gurucharan directly.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: ['gurucharanvemuru@gmail.com'],
        reply_to: email.trim(),
        subject: `Portfolio message from ${name.trim()}`,
        text: `From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`
      })
    });
    if (!response.ok) {
      console.error('Resend rejected portfolio message:', response.status);
      return res.status(502).json({ error: 'Your message could not be sent. Please email Gurucharan directly.' });
    }
    return res.status(200).json({ sent: true });
  } catch (error) {
    console.error('Portfolio email delivery failed:', error.message);
    return res.status(502).json({ error: 'Your message could not be sent. Please email Gurucharan directly.' });
  }
};
