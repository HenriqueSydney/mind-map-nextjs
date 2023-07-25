import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
// import { render } from '@react-email/render'
import { hash } from 'bcryptjs'

// import { sendEmail } from '@/lib/emails'

// import RegisterVerificationEmail from '@/emails/RegisterVerificationEmail'
import { getRandomIntInclusive } from '@/utils/randomNumber'

export async function POST(request: NextRequest) {
  const { name, email, password, acceptNotifications } = await request.json()

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userExists && userExists.emailVerified) {
    return NextResponse.json(
      { message: 'Email already registered.' },
      { status: 400 },
    )
  }

  const hashedPassword = await hash(password, 6)

  const verificationEmailNumber = getRandomIntInclusive(1000, 9999)

  /* const emailHtml = render(
    RegisterVerificationEmail({
      email,
      name,
      hashConfirmation: verificationEmailNumber,
    }),
  ) */

  console.log(verificationEmailNumber)

  /* sendEmail({
    to: email,
    subject: name,
    html: emailHtml,
  }) */

  if (userExists) {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        hashedPassword,
        verificationEmailNumber,
        acceptNotifications,
      },
    })
    return NextResponse.json(user, { status: 200 })
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      verificationEmailNumber,
      acceptNotifications,
    },
  })

  return NextResponse.json(user, { status: 201 })
}
