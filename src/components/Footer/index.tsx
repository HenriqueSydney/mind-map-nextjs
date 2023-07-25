import Link from 'next/link'
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'

import {
  faFile,
  faMailBulk,
  faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons'

import { GoogleMapsLink } from '../GoogleMapsLink'

import { Divider } from '../Divider'
import { ButtonIcon } from '../Buttons/ButtonIcon'

import styles from './styles.module.scss'

export function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles['location-image-container']}>
        <Image
          src="/mapa.png"
          alt="Mapa com a localização da Simply Nature"
          width={900}
          height={270}
          className={styles['location-image']}
        />
        <div className={styles['location-info']}>
          <div>
            <h1>Localização</h1>
            <div className={styles['info-container']}>
              <FontAwesomeIcon icon={faMapLocationDot} />
              <span>
                Heaven in earth - Spa Lagoon - Access DF 1021, Farm Nature.
                Brasília/DF
              </span>
            </div>
          </div>

          <div>
            <ButtonIcon variant="SECONDARY">
              <GoogleMapsLink
                title="TRAÇAR A ROTA"
                latitude={40.712776}
                longitude={-74.005974}
              />
            </ButtonIcon>
          </div>
        </div>
      </div>

      <Divider />

      <div className={styles['section-container']}>
        <section>
          <div className={styles['social-media-container']}>
            <img src="/logo_branco.png" alt="" width={200} height={200} />
            <div className={styles['social-media-icons']}>
              <a
                href="https://www.instagram.com/chapadaindaia/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://www.instagram.com/chapadaindaia/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faPinterest} />
              </a>
              <a
                href="https://www.instagram.com/chapadaindaia/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
          </div>
        </section>
        <section>
          <h1>Informações</h1>
          <div>
            <strong>SIMPLY NATURE INN</strong>
            <br />
            <span>CNPJ: XX.XXX.XXX/XXXX-XX</span>
          </div>
          <Link href="/privacy-policy" className={styles['info-container']}>
            <FontAwesomeIcon icon={faFile} />
            <span>Política de privacidade</span>
          </Link>
          <div className={styles['info-container']}>
            <FontAwesomeIcon icon={faFile} />
            <span>Termos de Uso</span>
          </div>
        </section>

        <section>
          <h1>Contato</h1>
          <div className={styles['info-container']}>
            <FontAwesomeIcon icon={faWhatsapp} />
            <a
              href="http://api.whatsapp.com/send?1=pt_BR&phone=5561995125151&text=Olá, tudo bem? Gostaria de informações sobre (...)"
              target="_blank"
              rel="noreferrer"
            >
              +55 (xx) xxxxx-xxxx
            </a>
          </div>
          <div className={styles['info-container']}>
            <FontAwesomeIcon icon={faMailBulk} />
            <a href={`mailto:exemple@simply-nature.com`}>
              exemple@simply-nature.com
            </a>
          </div>
        </section>
      </div>
    </footer>
  )
}
