import { Img, Section } from '@react-email/components'

export default function EmailHeader() {
  return (
    <>
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
      </Section>
    </>
  )
}

const logo = {
  padding: '30px 20px',
}

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
}
