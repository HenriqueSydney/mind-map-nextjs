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
  hashConfirmation: number
}

export default function RegisterVerificationEmail({
  email = 'henriquesydney@hotmail.com',
  name = 'Henrique Sydney Ribeiro Lima',
  hashConfirmation = 1234,
}: RappellingEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Simply Nature Inn</Preview>
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
                  Olá, {name.split(' ')[0]}, tudo bem?
                </Heading>
                <Text style={paragraph}>
                  Foi iniciado um cadastro em nosso site com este email. Caso
                  tenha sido você que iniciou este cadastro, copie e cole o
                  código abaixo na página de confirmação
                </Text>

                <Text style={{ ...paragraph, textAlign: 'center' }}>
                  <strong>CÓDIGO DE CONFIRMAÇÃO: </strong>
                  <br />
                  <br />
                  <strong
                    style={{
                      fontSize: 42,
                    }}
                  >
                    {hashConfirmation}
                  </strong>
                  <br />
                </Text>

                <Text style={paragraph}>
                  Caso não tenha sido você que iniciou o cadastramento, favor
                  desconsiderar este email.
                </Text>
                <Heading
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}
                >
                  Dados preenchidos:
                </Heading>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Nome: </b>
                  {name}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Email: </b>
                  {email}
                </Text>
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
