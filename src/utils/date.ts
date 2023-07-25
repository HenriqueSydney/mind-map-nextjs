import { differenceInDays, format } from 'date-fns'

export function dateDifferenceInDays(
  initialDate: Date,
  finalDate: Date,
): number {
  return differenceInDays(finalDate, initialDate)
}

export function datePtBrFormatter(date: Date): string {
  return format(date, 'dd/MM/yyyy')
}
