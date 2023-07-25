import styles from './styles.module.scss'

export function ReservationObservations() {
  return (
    <ul className={styles.infos}>
      <li>
        Para reserva de acomodações, o café da manha é incluso e estará
        disponível até às 11:00
      </li>
      <li>
        Em caso de cancelamento em até 72 horas de antecedência, o valor total
        pago será restituído
      </li>
      <li>
        Em caso de cancelamento com menos de 72 horas de antecedência, será
        restituído apenas 50% do valor pago
      </li>
      <li>
        Em caso de não comparecimento, não haverá direito à restituição de
        qualquer quantia
      </li>
    </ul>
  )
}
