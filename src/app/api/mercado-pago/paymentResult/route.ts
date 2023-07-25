import { Status } from '@prisma/client'
import { NextRequest } from 'next/server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

// import { render } from '@react-email/render'

// import { sendEmail } from '@/lib/emails'

// import RegisterVerificationEmail from '@/emails/RegisterVerificationEmail'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const payment_id = searchParams.get('payment_id')
  const status = searchParams.get('status')
  const preference_id = searchParams.get('preference_id')

  const order = await prisma.order.update({
    where: {
      preferenceId: String(preference_id),
    },
    data: {
      status: status === 'approved' ? Status.APPROVED : Status.CANCELLED,
      paymentId: Number(payment_id),
    },
  })

  // ENVIAR EMAIL

  redirect(`/reservations/confirmation/${order.id}`)
}
/*
http://localhost:3000/api/mercado-pago/paymentResult?payment_id=1316657019&status=approved&preference_id=84206194-aca895e2-136b-4761-8a23-4130450666ab
external_reference=null&
payment_type=credit_card&
merchant_order_id=10537466370&
site_id=MLB&processing_mode=aggregator&
merchant_account_id=null
*/
