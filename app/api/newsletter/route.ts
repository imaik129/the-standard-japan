import { NextRequest, NextResponse } from 'next/server'

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source = 'website' } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    const cleanEmail = email.trim().toLowerCase()

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    // Try to save to DB (gracefully skip if not configured)
    if (process.env.POSTGRES_URL) {
      try {
        const { addSubscriber, createSubscribersTable } = await import('@/lib/db')
        await createSubscribersTable()
        const isNew = await addSubscriber(cleanEmail, source)

        if (!isNew) {
          return NextResponse.json(
            { message: 'You\'re already subscribed. See you in your inbox!' },
            { status: 200 }
          )
        }
      } catch (dbError) {
        console.error('DB error:', dbError)
        // Continue to send welcome email even if DB fails
      }
    }

    // Send welcome email (gracefully skip if not configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const { sendWelcomeEmail } = await import('@/lib/resend')
        await sendWelcomeEmail(cleanEmail)
      } catch (emailError) {
        console.error('Email error:', emailError)
        // Don't fail the request if email sending fails
      }
    }

    return NextResponse.json(
      { message: 'Welcome to The Standard Japan. Check your inbox.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
