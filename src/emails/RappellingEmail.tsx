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
} from '@react-email/components'

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
      <Preview>Yelp recent login</Preview>
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
              src={`https://cdn.paytour.com.br/assets/images/passeios-2500214/5d6f9c724bdc6cbc8efb0f9852841227/2.jpg`}
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

          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'rgb(0,0,0, 0.7)',
            }}
          >
            © 2023 | Chapada Indaía, Recreio dos Indaiás - Rio Itiquira - Acesso
            GO 430, Fazenda Citates. Formosa/GO, 73801-220, CNPJ:
            26.475.871/0001-55 | www.yelp.com
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
