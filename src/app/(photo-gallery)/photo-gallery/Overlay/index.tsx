import { useState } from 'react'

interface IOverlay {
  onClick: () => void
}

export function Overlay({ onClick }: IOverlay) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transition: 'background-color 0.3s',
        backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
        cursor: 'pointer',
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    ></div>
  )
}
