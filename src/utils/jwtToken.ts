import { ExpiredTokenError } from '@/app/Errors/InvalidTokenError.ts copy'
import { env } from '@/env'
import jwt from 'jsonwebtoken'
import { InvalidTokenError } from 'jwt-decode'

interface GenerateJwtTokenProps {
  data: any
  expiresIn?: number
}

const DEFAULT_EXPIRATION_TIME = 60 * 60

export function generateJwtToken({
  data,
  expiresIn = DEFAULT_EXPIRATION_TIME,
}: GenerateJwtTokenProps) {
  const jwtSecretKey = env.JWT_SECRET_KEY

  const token = jwt.sign(
    {
      data,
    },
    jwtSecretKey,
    { expiresIn },
  )

  return token
}

export function verifyJwtToken(token: string) {
  const jwtSecretKey = env.JWT_SECRET_KEY

  jwt.verify(token, jwtSecretKey, (error, decoded) => {
    if (error) {
      switch (error.name) {
        case 'TokenExpiredError':
          throw new ExpiredTokenError()
        case 'JsonWebTokenError':
        case 'NotBeforeError':
          throw new InvalidTokenError()
      }
    }

    return decoded
  })
}
