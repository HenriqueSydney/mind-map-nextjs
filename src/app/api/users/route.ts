import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { render } from '@react-email/render'
import { hash } from 'bcryptjs'

import { generateJwtToken, verifyJwtToken } from '@/utils/jwtToken'
import { sendEmail } from '@/lib/emails'

import RegisterVerificationEmail from '@/emails/RegisterVerificationEmail'
import { ExpiredTokenError } from '@/app/Errors/InvalidTokenError.ts copy'
import { InvalidTokenError } from 'jwt-decode'

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json()

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

  const jwtData = {
    name,
    email,
  }

  const verificationEmailHash = generateJwtToken({ data: jwtData })

  const emailHtml = render(
    RegisterVerificationEmail({
      email,
      name,
      hashConfirmation: verificationEmailHash,
    }),
  )

  sendEmail({
    to: email,
    subject: name,
    html: emailHtml,
  })

  if (userExists) {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        hashedPassword,
        verificationEmailHash,
      },
    })
    return NextResponse.json(user, { status: 200 })
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      verificationEmailHash,
    },
  })

  return NextResponse.json(user, { status: 201 })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  const confirmationHash = searchParams.get('confirmationHash')

  if (!email) {
    return NextResponse.json({ message: 'User not found.' }, { status: 400 })
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!userExists) {
    return NextResponse.json({ message: 'User not found.' }, { status: 404 })
  }

  if (
    !confirmationHash ||
    userExists.verificationEmailHash !== confirmationHash
  ) {
    return NextResponse.json(
      { message: 'Verification e-mail hash not equal.' },
      { status: 401 },
    )
  }

  try {
    verifyJwtToken(confirmationHash)
  } catch (error) {
    if (error instanceof ExpiredTokenError) {
      return NextResponse.json({ message: 'Expired token.' }, { status: 401 })
    } else if (error instanceof InvalidTokenError) {
      return NextResponse.json({ message: 'Invalid Token.' }, { status: 401 })
    }
    return NextResponse.json({ message: 'Unknown error.' }, { status: 500 })
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
