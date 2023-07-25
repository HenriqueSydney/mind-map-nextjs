import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import { randomUUID } from 'crypto'

import QRCode from 'react-qr-code'
import EmailHeader from './EmailHeader'
import EmailFooter from './EmailFooter'

interface RappellingEmailProps {
  name: string
  email: string
  phoneNumber: string
  message: string
}

export default function ConfirmationEmail({
  email = 'henriquesydney@hotmail.com',
  message = 'lorem Ipsum dolor sit amet, consectetur adipis',
  name = 'Henrique Sydney Ribeiro Lima',
  phoneNumber = '(61) 99512-5151',
}: RappellingEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Simply Nature | Reservation Confirmation </Preview>
      <Body style={main}>
        <Container>
          <EmailHeader />
          <Section style={content}>
            <Row style={{ ...boxInfos, paddingBottom: '0' }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  UEBAAA!!
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  RESERVA CONFIRMADA!
                </Heading>

                <Container
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <QRCode
                      size={256}
                      style={{
                        height: 'auto',
                        maxWidth: '80%',
                        width: '80%',
                        marginTop: 10,
                      }}
                      value={randomUUID()}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </Container>

                <Text style={paragraph}>
                  <b>Nome: </b>
                  {name}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Email: </b>
                  {email}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Telefone: </b>
                  {phoneNumber}
                </Text>
                <Text style={paragraph}>
                  <b>Mensagem de contato:</b>
                </Text>
                <Text style={paragraph}>{message}</Text>
              </Column>
            </Row>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const paragraph = {
  fontSize: 16,
}

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
}

const boxInfos = {
  padding: '20px 40px',
}
