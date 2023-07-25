import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMailBulk, faSmileWink } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'

import { Divider } from '@/components/Divider'

import styles from './styles.module.scss'

export function ReservationContactAndHelp() {
  return (
    <>
      <h2>Precisa de Ajuda?</h2>
      <div className={styles.contact}>
        <span>
          Caso tenha dúvidas com relação à reserva, entre em contato conosco
          pelos seguintes canais:
        </span>
      </div>
      <div className={styles.contact}>
        <a
          href="http://api.whatsapp.com/send?1=pt_BR&phone=5561995125151&text=Olá, tudo bem? Gostaria de informações sobre (...)"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faWhatsapp} /> +55 (xx) xxxxx-xxxx
        </a>
      </div>
      <div className={styles.contact}>
        <a href={`mailto:exemple@simply-nature.com`}>
          <FontAwesomeIcon icon={faMailBulk} /> exemple@simply-nature.com
        </a>
      </div>

      <div className={styles.share}>
        <strong>
          Compartilhe sua história e ajude outros aventureiros nesta jornada{' '}
          <FontAwesomeIcon icon={faSmileWink} />
        </strong>
      </div>

      <Divider width={100} />
      <div className={styles['social-media-icons']}>
        <Link
          href="https://www.instagram.com/chapadaindaia/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </Link>
        <Link
          href="https://www.instagram.com/chapadaindaia/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faPinterest} />
        </Link>
        <Link
          href="https://www.instagram.com/chapadaindaia/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </Link>
      </div>
      <Divider width={100} />
    </>
  )
}
