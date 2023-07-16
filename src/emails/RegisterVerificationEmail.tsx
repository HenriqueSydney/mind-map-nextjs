import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Link,
} from '@react-email/components'

interface RappellingEmailProps {
  name: string
  email: string
  hashConfirmation: string
}

export default function RegisterVerificationEmail({
  email = 'henriquesydney@hotmail.com',
  name = 'Henrique Sydney Ribeiro Lima',
  hashConfirmation = '',
}: RappellingEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Pleasure Nature Inn</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img
              src={`https://cdn.paytour.com.br/assets/images/logos/logo-634232e961279a814e4a84308c31f36cd025830d.png?v=1687920216`}
            />
          </Section>

          <Section style={content}>
            <Img
              width={620}
              style={{ height: '300px', objectFit: 'cover' }}
              src={`https://images.unsplash.com/photo-1629570682819-90789d43672a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80`}
            />

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
                  tenha sido você que iniciou este cadastro, clique no link
                  abaixo para confirmar e seja muito bem vindo à Pleasure Nature
                  Inn
                </Text>

                <Text style={{ ...paragraph, textAlign: 'center' }}>
                  <b>Link de confirmação: </b>
                  <br />
                  <Link
                    href={`http://localhost:3000/api/users?email=${email}&confirmationHash=${hashConfirmation}`}
                  >
                    {`http://localhost:3000/api/users?email=${email}&confirmationHash=${hashConfirmation}`}
                  </Link>
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

          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'rgb(0,0,0, 0.7)',
            }}
          >
            © 2023 | Pleasure Nature Inn, Heaven in earth - Spa Lagoon - Access
            DF 1021, Farm Nature. Brasília/DF, XX.XXX-XXX, CNPJ:
            XX.XXX.XXX/XXXX-XX | http://localhost:3000
          </Text>
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

const logo = {
  padding: '30px 20px',
}

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
}

const boxInfos = {
  padding: '20px 40px',
}
