import { NextRequest, NextResponse } from 'next/server'
import mercadoPago from '@/lib/mercadoPago'

export async function PUT(request: NextRequest) {
  const { payment_id } = await request.json()

  const response = await mercadoPago.payment.cancel(Number(payment_id))

  console.log(response)

  return NextResponse.json({
    Payment: payment_id,
  })
}
