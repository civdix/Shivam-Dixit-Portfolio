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

The founder site also exposes a public contact form at `/api/contact` when the
SMTP variables above are configured. Set `EMAIL_TO` to the inbox that should
receive those inquiries; it defaults to the portfolio email address.

## GitHub showcase projects

Repositories are added to the projects section when they have the `showcase`
topic. A repository can provide its preview image without changing this
portfolio by adding a second topic in this format:

`image-url-<base64url-encoded-image-url>`

For example:

```bash
gh repo edit OWNER/REPOSITORY \
  --add-topic showcase \
  --add-topic "image-url-$(printf '%s' 'https://example.com/preview.png' | base64 -w 0 | tr '+/' '-_' | tr -d '=')"
```

The topic image is used when no local preview exists. If it cannot be loaded,
the project image area falls back to the normal empty preview state.

You can also put the image URL in the repository description. Markdown images
such as `![Preview](https://example.com/preview.png)`, HTML image tags, and
direct `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, or `.svg` URLs are detected.
Topic and local preview images take priority over description images.
