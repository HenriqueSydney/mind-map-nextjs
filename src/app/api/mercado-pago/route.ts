import { NextRequest, NextResponse } from 'next/server'

import mercadoPago from '@/lib/mercadoPago'

import { PreferenceItem } from 'mercadopago/models/preferences/create-payload.model'

import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'

import { CartData } from '@/context/CartContext'

import { dateDifferenceInDays } from '@/utils/date'

export async function POST(request: NextRequest) {
  const { cartData, checkOutFormData } = await request.json()
  try {
    const accommodationReservationsData: Prisma.AccommodationReservationUncheckedCreateInput[] =
      []
    const activityReservationsData: Prisma.ActivityReservationUncheckedCreateInput[] =
      []
    const orderData = (cartData as CartData[]).map((item) => {
      if (item.type === 'accommodation') {
        if (!item.accommodation) return false
        const checkIn = new Date(item.accommodation.checkInDate)
        const checkOut = new Date(item.accommodation.checkOutDate)
        const stayInDays = dateDifferenceInDays(checkIn, checkOut)
        accommodationReservationsData.push({
          accommodationId: '21a104ac-e9cb-49e3-a2f4-03a0cd20d868',
          arrivalDate: checkIn,
          departureDate: checkOut,
          quantity: Number(item.accommodation.quantityOfAccommodations),
          pricePerDay:
            Number(item.subtotal) /
            Number(stayInDays) /
            Number(item.accommodation.quantityOfAccommodations),
          totalPrice: Number(item.subtotal),
        })

        return {
          id: item.id,
          title: item.accommodation.title,
          description: `Reserva da acomodação ${item.accommodation.title}, ${item.accommodation.quantityOfAccommodations} quarto(s), por ${stayInDays} dia(s)`,
          unit_price: Number(item.subtotal),
          currency_id: 'BRL',
          quantity: Number(item.accommodation.quantityOfAccommodations),
        }
      }
      if (!item.activity) return false

      activityReservationsData.push({
        activityId: 'bdc68d75-9819-4354-88cd-723f4b657e24',
        date: new Date(item.activity.date),
        quantityOfAdults: Number(item.activity.quantityOfAdults),
        quantityOfChilds: Number(item.activity.quantityOfChildren),
        quantityOfSeniors: Number(item.activity.quantityOfSeniors),
        totalPrice: Number(item.subtotal),
      })

      return {
        id: item.id,
        title: item.activity.title,
        description: `Reserva da atividade ${item.activity.title}, ${item.activity.quantityOfAdults} adulto(s), ${item.activity.quantityOfAdults} criança(s), ${item.activity.quantityOfSeniors} idoso(s)`,
        unit_price: Number(item.subtotal),
        currency_id: 'BRL',
        quantity:
          Number(item.activity.quantityOfAdults) +
          Number(item.activity.quantityOfChildren) +
          Number(item.activity.quantityOfSeniors),
      }
    })

    const userData = {
      name: checkOutFormData.name,
      Surname: checkOutFormData.surname,
      email: checkOutFormData.email,
      identification: {
        type: 'EMAIL',
        number: checkOutFormData.email,
      },
      address: {
        street_name: `${checkOutFormData.street} ${checkOutFormData.complement}, ${checkOutFormData.neighborhood},${checkOutFormData.city} (${checkOutFormData.state})`,
        street_number: Number(checkOutFormData.number),
        zip_code: checkOutFormData.zip_code,
      },
    }

    const response = await mercadoPago.preferences.create({
      items: orderData as PreferenceItem[],
      payer: userData,
      back_urls: {
        success: 'http://localhost:3000/api/mercado-pago/paymentResult',
        failure: 'http://localhost:3000/api/mercado-pago/paymentResult',
        pending: 'http://localhost:3000/api/mercado-pago/paymentResult',
      },
      binary_mode: true,
      auto_return: 'approved',
    })

    const { id: preferenceId } = response.body

    const existingUser = await prisma.user.findUnique({
      where: { email: checkOutFormData.email },
    })

    const order = await prisma.order.create({
      data: {
        preferenceId,
        email: checkOutFormData.email,
        guest_name: `${checkOutFormData.name} ${checkOutFormData.surname}`,
        userId: existingUser ? existingUser.id : null,
      },
    })

    console.log(order)

    accommodationReservationsData.forEach((item) => {
      item.orderId = order.id
    })

    activityReservationsData.forEach((item) => {
      item.orderId = order.id
    })

    await prisma.accommodationReservation.createMany({
      data: accommodationReservationsData,
    })

    await prisma.activityReservation.createMany({
      data: activityReservationsData,
    })

    return NextResponse.json({
      id: preferenceId,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error', status: 500 })
  }
}
