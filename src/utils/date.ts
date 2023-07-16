import { differenceInDays, format } from 'date-fns'

export function dateDifferenceInDays(
  initialDate: Date,
  finalDate: Date,
): number {
  return differenceInDays(initialDate, finalDate)
}

export function datePtBrFormatter(date: Date): string {
  return format(date, 'dd/MM/yyyy')
}
