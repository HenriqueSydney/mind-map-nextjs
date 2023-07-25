import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
// import { render } from '@react-email/render'

// import { sendEmail } from '@/lib/emails'

// import RegisterVerificationEmail from '@/emails/RegisterVerificationEmail'
import { getRandomIntInclusive } from '@/utils/randomNumber'

export async function POST(request: NextRequest) {
  const { email } = await request.json()

  if (!email || Array.isArray(email)) {
    return NextResponse.json({ message: 'Invalid email.' }, { status: 400 })
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!userExists) {
    return NextResponse.json({ message: 'User not found.' }, { status: 404 })
  }

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

  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      verificationEmailNumber,
    },
  })
  return NextResponse.json(user, { status: 200 })
}

export async function PUT(request: NextRequest) {
  const { verificationCode, email } = await request.json()

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!userExists) {
    return NextResponse.json({ message: 'User not found.' }, { status: 404 })
  }

  if (
    !verificationCode ||
    userExists.verificationEmailNumber !== verificationCode
  ) {
    return NextResponse.json(
      { message: 'Verification e-mail number not equal.' },
      { status: 401 },
    )
  }

  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      emailVerified: new Date(),
    },
  })

  return NextResponse.json(user, { status: 200 })
}
