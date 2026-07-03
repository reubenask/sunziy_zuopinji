import * as React from 'react'
import './tilted-card.css'

const SPRING = { damping: 30, stiffness: 100, mass: 2 }
const CAPTION_SPRING = { damping: 30, stiffness: 350, mass: 1 }

const makeValue = (value = 0) => ({ value, target: value, velocity: 0 })

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '440px',
  containerWidth = '100%',
  imageHeight = '100%',
  imageWidth = '100%',
  scaleOnHover = 1.15,
  rotateAmplitude = 20,
  showMobileWarning = false,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false
}) {
  const figureRef = React.useRef(null)
  const innerRef = React.useRef(null)
  const captionRef = React.useRef(null)
  const pointerRef = React.useRef({ x: 0, y: 0, lastY: 0 })
  const valuesRef = React.useRef({
    rotateX: makeValue(), rotateY: makeValue(), scale: makeValue(1),
    opacity: makeValue(), captionRotate: makeValue()
  })

  React.useEffect(() => {
    let frame
    let last = performance.now()
    const stepValue = (item, config, dt) => {
      const force = -config.stiffness * (item.value - item.target) - config.damping * item.velocity
      item.velocity += (force / config.mass) * dt
      item.value += item.velocity * dt
    }
    const animate = (now) => {
      const dt = Math.min((now - last) / 1000, .032)
      last = now
      const v = valuesRef.current
      stepValue(v.rotateX, SPRING, dt); stepValue(v.rotateY, SPRING, dt)
      stepValue(v.scale, SPRING, dt); stepValue(v.opacity, SPRING, dt)
      stepValue(v.captionRotate, CAPTION_SPRING, dt)
      if (innerRef.current) innerRef.current.style.transform = `rotateX(${v.rotateX.value}deg) rotateY(${v.rotateY.value}deg) scale(${v.scale.value})`
      if (captionRef.current) {
        captionRef.current.style.transform = `translate(${pointerRef.current.x}px, ${pointerRef.current.y}px) rotate(${v.captionRotate.value}deg)`
        captionRef.current.style.opacity = Math.max(0, Math.min(1, v.opacity.value))
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  const handleMouse = (event) => {
    const rect = figureRef.current?.getBoundingClientRect()
    if (!rect) return
    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2
    const v = valuesRef.current
    v.rotateX.target = (offsetY / (rect.height / 2)) * -rotateAmplitude
    v.rotateY.target = (offsetX / (rect.width / 2)) * rotateAmplitude
    const velocityY = offsetY - pointerRef.current.lastY
    v.captionRotate.target = -velocityY * .6
    pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top, lastY: offsetY }
  }

  const handleEnter = () => {
    valuesRef.current.scale.target = scaleOnHover
    valuesRef.current.opacity.target = 1
  }

  const handleLeave = () => {
    const v = valuesRef.current
    v.opacity.target = 0; v.scale.target = 1
    v.rotateX.target = 0; v.rotateY.target = 0; v.captionRotate.target = 0
  }

  return <figure ref={figureRef} className="tilted-card-figure" style={{ height: containerHeight, width: containerWidth }} onMouseMove={handleMouse} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
    {showMobileWarning && <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>}
    <div ref={innerRef} className="tilted-card-inner" style={{ width: imageWidth, height: imageHeight }}>
      <img src={imageSrc} alt={altText} className="tilted-card-img" />
      {displayOverlayContent && overlayContent && <div className="tilted-card-overlay">{overlayContent}</div>}
    </div>
    {showTooltip && <figcaption ref={captionRef} className="tilted-card-caption">{captionText}</figcaption>}
  </figure>
}
