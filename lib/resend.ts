import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(email: string) {
  const { data, error } = await resend.emails.send({
    from: 'The Standard Japan <hello@thestandardjapan.com>',
    to: email,
    subject: 'Welcome to The Standard Japan',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="background-color: #0A0A0A; color: #F5F5F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 48px 24px;">
            <div style="border-bottom: 1px solid #2A2A2A; padding-bottom: 24px; margin-bottom: 32px;">
              <h1 style="font-size: 28px; font-weight: 700; letter-spacing: -0.5px; margin: 0; color: #F5F5F0;">THE STANDARD JAPAN</h1>
              <p style="font-size: 12px; letter-spacing: 2px; color: #666666; margin: 4px 0 0;">TOKYO'S UNDERGROUND, UNFILTERED.</p>
            </div>

            <h2 style="font-size: 22px; font-weight: 600; color: #F5F5F0; margin: 0 0 16px;">You're in.</h2>

            <p style="font-size: 16px; line-height: 1.7; color: #F5F5F0; margin: 0 0 24px;">
              Welcome to The Standard Japan. You've just subscribed to the one newsletter that doesn't pull its punches about Tokyo — the izakayas at 2am, the galleries nobody's writing about yet, the ramen shops with no sign.
            </p>

            <p style="font-size: 16px; line-height: 1.7; color: #F5F5F0; margin: 0 0 32px;">
              Expect our newsletter in your inbox soon. In the meantime, explore the magazine.
            </p>

            <a href="https://thestandardjapan.com/magazine" style="display: inline-block; background-color: #C8102E; color: #F5F5F0; text-decoration: none; padding: 14px 28px; font-size: 14px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">
              READ THE MAGAZINE
            </a>

            <div style="border-top: 1px solid #2A2A2A; margin-top: 48px; padding-top: 24px;">
              <p style="font-size: 12px; color: #666666; margin: 0;">
                © ${new Date().getFullYear()} The Standard Japan. Tokyo, Japan.
                <br>
                <a href="https://thestandardjapan.com/unsubscribe" style="color: #666666;">Unsubscribe</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  })

  if (error) throw error
  return data
}
