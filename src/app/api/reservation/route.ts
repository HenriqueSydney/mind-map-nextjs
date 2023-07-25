import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('order_id')

    if (!orderId) {
      return NextResponse.json(
        { message: 'Código de Reserva não localizado' },
        { status: 404 },
      )
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        AccommodationsReservations: {
          include: {
            Accommodation: true,
          },
        },
        ActivityReservations: {
          include: {
            Activity: true,
          },
        },
        User: true,
      },
    })

    return NextResponse.json(order, { status: 200 })
  } catch (error) {
    console.log(error)
  }
}
