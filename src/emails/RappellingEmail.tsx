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
import EmailFooter from './EmailFooter'
import EmailHeader from './EmailHeader'

interface RappellingEmailProps {
  name: string
  email: string
  phoneNumber: string
  message: string
}

export default function RappellingEmail({
  email = 'henriquesydney@hotmail.com',
  message = 'lorem Ipsum dolor sit amet, consectetur adipis',
  name = 'Henrique Sydney Ribeiro Lima',
  phoneNumber = '(61) 99512-5151',
}: RappellingEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Simply Nature | Rappel Contact</Preview>
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
                  Opa!!
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Um potencial cliente entrou em contato!
                </Heading>

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
