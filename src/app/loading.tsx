import { ClipLoader } from 'react-spinners'

export default function Loading() {
  return (
    <>
      <main
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '10rem',
        }}
      >
        <ClipLoader color="#FAFAFA" />
      </main>
    </>
  )
}
