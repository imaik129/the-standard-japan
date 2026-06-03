import { NextRequest, NextResponse } from 'next/server'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject = '', message } = body

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
    }
    if (!email || !isValidEmail(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 })
    }

    if (process.env.POSTGRES_URL) {
      const { addContactMessage, createContactMessagesTable } = await import('@/lib/db')
      await createContactMessagesTable()
      await addContactMessage(name.trim(), email.trim().toLowerCase(), message.trim(), subject.trim())
    }

    return NextResponse.json(
      { message: 'Message received. We\'ll be in touch.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
