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
          alt="Mapa com a localização da Chapada Indaiá"
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
                Recreio dos Indaiás - Rio Itiquira - Acesso GO 430, Fazenda
                Citates. Formosa/GO, 73801-220
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
            <img src="/logo.png" alt="" width={250} height={250} />
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
          </div>
        </section>
        <section>
          <h1>Informações</h1>
          <div>
            <strong>CHAPADA DO INDAIA ECOPARQUE LTDA.</strong>
            <br />
            <span>CNPJ: 26.475.871/0001-55</span>
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
            <Link
              href="http://api.whatsapp.com/send?1=pt_BR&phone=5561995125151&text=Olá, tudo bem? Gostaria de informações sobre (...)"
              target="_blank"
            >
              +55 (61) 995125151
            </Link>
          </div>
          <div className={styles['info-container']}>
            <FontAwesomeIcon icon={faMailBulk} />
            <a href={`mailto:chapadaindaia@gmail.com`}>
              chapadaindaia@gmail.com
            </a>
          </div>
        </section>
      </div>
    </footer>
  )
}
