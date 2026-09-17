## Email API

`POST /api/send-email` sends an email through the configured SMTP account. The
recipient is supplied with each authenticated request.

Copy `.env.example` to `.env.local` and fill in the SMTP credentials and a
long random `EMAIL_API_TOKEN`.

Required headers:

- `Authorization: Bearer <EMAIL_API_TOKEN>`
- `X-Email-To: recipient@example.com`
- `X-Email-Subject: Subject text`
- `X-Email-Text: Plain text body` or `X-Email-HTML: <p>HTML body</p>`

Optional header:

- `X-Email-Reply-To: sender@example.com`
