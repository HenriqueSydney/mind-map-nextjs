import { NextRequest, NextResponse } from 'next/server'

import { render } from '@react-email/render'
import { sendEmail } from '@/lib/emails'

import RappellingEmail from '@/emails/RappellingEmail'

export async function GET(request: NextRequest) {
  const { name, email, phoneNumber, message, rappellingContact } =
    await request.json()

  const html = render(RappellingEmail({ name, email, phoneNumber, message }))

  await sendEmail({
    to: rappellingContact,
    subject: 'Interesse na atividade: Rapel',
    html,
  })

  return NextResponse.json(
    { message: 'Email sent successfully' },
    { status: 200 },
  )
}
