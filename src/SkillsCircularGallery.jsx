import * as React from 'react'

const vertex = `
  attribute vec2 aPosition;
  attribute vec2 aUv;
  uniform vec2 uResolution;
  uniform vec2 uPlane;
  uniform vec2 uTranslate;
  uniform float uRotation;
  uniform float uTime;
  uniform float uSpeed;
  varying vec2 vUv;
  void main() {
    vUv = aUv;
    vec2 p = aPosition;
    float motion = clamp(abs(uSpeed), 0.0, 1.35);
    float direction = uSpeed < 0.0 ? -1.0 : 1.0;
    p.y += (sin(p.x * 4.0 + uTime) * 0.025 + cos(p.y * 2.0 + uTime) * 0.02) * motion;
    p.x += sin((p.y + p.x) * 3.0 + uTime) * 0.012 * motion * direction;
    float c = cos(uRotation);
    float s = sin(uRotation);
    vec2 rotated = mat2(c, -s, s, c) * (p * uPlane);
    vec2 pos = uTranslate + rotated;
    vec2 clip = (pos / uResolution) * 2.0 - 1.0;
    gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  }
`

const fragment = `
  precision highp float;
  uniform sampler2D tMap;
  uniform vec2 uImageSizes;
  uniform vec2 uPlane;
  uniform float uBorderRadius;
  uniform float uOpacity;
  varying vec2 vUv;

  float roundedBoxSDF(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b;
    return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
  }

  void main() {
    vec2 ratio = vec2(
      min((uPlane.x / uPlane.y) / (uImageSizes.x / uImageSizes.y), 1.0),
      min((uPlane.y / uPlane.x) / (uImageSizes.y / uImageSizes.x), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
    vec4 color = texture2D(tMap, uv);
    float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
    float alpha = 1.0 - smoothstep(-0.003, 0.003, d);
    gl_FragColor = vec4(color.rgb, color.a * alpha * uOpacity);
  }
`

const createShader = (gl, type, source) => {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) || 'Shader compile failed')
  }
  return shader
}

const createProgram = (gl) => {
  const program = gl.createProgram()
  gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertex))
  gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragment))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || 'Program link failed')
  }
  return program
}

const createGeometry = (gl, cols = 70, rows = 46) => {
  const vertices = []
  const indices = []
  for (let y = 0; y <= rows; y += 1) {
    for (let x = 0; x <= cols; x += 1) {
      const u = x / cols
      const v = y / rows
      vertices.push(u - 0.5, v - 0.5, u, 1 - v)
    }
  }
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const i = y * (cols + 1) + x
      indices.push(i, i + 1, i + cols + 1, i + 1, i + cols + 2, i + cols + 1)
    }
  }
  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
  const indexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
  return { vertexBuffer, indexBuffer, count: indices.length }
}

const makeTexture = (gl, source, onReady) => {
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([18, 28, 26, 255]))

  if (typeof source === 'string') {
    const img = new Image()
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      onReady?.(img.naturalWidth, img.naturalHeight)
    }
    img.src = source
  } else {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
    onReady?.(source.width, source.height)
  }
  return texture
}

const createTextCanvas = (text, color = '#ffffff') => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const font = '600 32px DM Sans, Arial, sans-serif'
  ctx.font = font
  const width = Math.ceil(ctx.measureText(text).width + 44)
  canvas.width = width
  canvas.height = 64
  ctx.font = font
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = color
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)
  return canvas
}

const lerp = (a, b, t) => a + (b - a) * t

export default function SkillsCircularGallery({
  items,
  bend = 3,
  borderRadius = 0.055,
  scrollSpeed = 2,
  scrollEase = 0.055,
  textColor = '#ffffff',
}) {
  const ref = React.useRef(null)

  React.useEffect(() => {
    const container = ref.current
    if (!container) return
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true })
    if (!gl) return

    container.appendChild(canvas)
    const program = createProgram(gl)
    const geometry = createGeometry(gl)

    const attrs = {
      position: gl.getAttribLocation(program, 'aPosition'),
      uv: gl.getAttribLocation(program, 'aUv'),
    }
    const uniforms = {
      resolution: gl.getUniformLocation(program, 'uResolution'),
      plane: gl.getUniformLocation(program, 'uPlane'),
      translate: gl.getUniformLocation(program, 'uTranslate'),
      rotation: gl.getUniformLocation(program, 'uRotation'),
      time: gl.getUniformLocation(program, 'uTime'),
      speed: gl.getUniformLocation(program, 'uSpeed'),
      imageSizes: gl.getUniformLocation(program, 'uImageSizes'),
      borderRadius: gl.getUniformLocation(program, 'uBorderRadius'),
      opacity: gl.getUniformLocation(program, 'uOpacity'),
      map: gl.getUniformLocation(program, 'tMap'),
    }

    const medias = items.concat(items).map((item, index) => {
      const media = {
        item,
        imageSize: [1, 1],
        titleSize: [1, 1],
        windPhase: index * 1.73 + Math.sin(index + 1) * 0.9,
      }
      media.texture = makeTexture(gl, item.image, (w, h) => { media.imageSize = [w, h] })
      const textCanvas = createTextCanvas(item.title, textColor)
      media.titleTexture = makeTexture(gl, textCanvas, (w, h) => { media.titleSize = [w, h] })
      return media
    })

    const state = {
      width: 1,
      height: 1,
      dpr: 1,
      cardW: 320,
      cardH: 430,
      step: 430,
      current: 0,
      target: 0,
      last: 0,
      dragging: false,
      start: 0,
      startTarget: 0,
      raf: 0,
    }

    const resize = () => {
      state.dpr = Math.min(window.devicePixelRatio || 1, 2)
      state.width = container.clientWidth || 1200
      state.height = container.clientHeight || 560
      canvas.width = Math.floor(state.width * state.dpr)
      canvas.height = Math.floor(state.height * state.dpr)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      gl.viewport(0, 0, canvas.width, canvas.height)
      state.cardW = Math.min(390, Math.max(250, state.width * 0.285))
      state.cardH = Math.min(430, Math.max(330, state.height * 0.76))
      state.step = state.cardW + Math.min(150, Math.max(96, state.width * 0.085))
    }

    const drawPlane = (texture, imageSize, x, y, w, h, rotation, opacity, radius, speed = 0) => {
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.uniform2f(uniforms.resolution, state.width * state.dpr, state.height * state.dpr)
      gl.uniform2f(uniforms.plane, w * state.dpr, h * state.dpr)
      gl.uniform2f(uniforms.translate, x * state.dpr, y * state.dpr)
      gl.uniform1f(uniforms.rotation, rotation)
      gl.uniform1f(uniforms.time, performance.now() * 0.001)
      gl.uniform1f(uniforms.speed, speed)
      gl.uniform2f(uniforms.imageSizes, imageSize[0], imageSize[1])
      gl.uniform1f(uniforms.borderRadius, radius)
      gl.uniform1f(uniforms.opacity, opacity)
      gl.drawElements(gl.TRIANGLES, geometry.count, gl.UNSIGNED_SHORT, 0)
    }

    const render = () => {
      state.current = lerp(state.current, state.target, scrollEase)
      const speed = state.current - state.last
      const shaderSpeed = Math.max(-1.35, Math.min(1.35, speed / 34))
      const total = state.step * medias.length
      const centerY = state.height * 0.47
      const bendPx = Math.max(1, Math.abs(bend) * 74)
      const half = state.width / 2
      const radius = (half * half + bendPx * bendPx) / (2 * bendPx)

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
      gl.useProgram(program)
      gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vertexBuffer)
      gl.enableVertexAttribArray(attrs.position)
      gl.enableVertexAttribArray(attrs.uv)
      gl.vertexAttribPointer(attrs.position, 2, gl.FLOAT, false, 16, 0)
      gl.vertexAttribPointer(attrs.uv, 2, gl.FLOAT, false, 16, 8)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.indexBuffer)
      gl.uniform1i(uniforms.map, 0)

      const time = performance.now() * 0.001
      const renderItems = medias.map((media, index) => {
        const raw = index * state.step - state.current
        const wrapped = ((((raw + total / 2) % total) + total) % total) - total / 2
        const effective = Math.min(Math.abs(wrapped), half)
        const arc = radius - Math.sqrt(Math.max(0, radius * radius - effective * effective))
        const wind = Math.max(0.25, 1 - Math.abs(wrapped) / (state.width * 0.9))
        const windX = (Math.sin(time * 0.72 + media.windPhase) * 3.2 + Math.sin(time * 1.11 + media.windPhase * 1.7) * 1.4) * wind
        const windY = (Math.cos(time * 0.64 + media.windPhase * 1.2) * 5.5 + Math.sin(time * 0.93 + media.windPhase) * 2.4) * wind
        const windRotation = (Math.sin(time * 0.58 + media.windPhase * 1.4) * 0.012 + Math.cos(time * 0.81 + media.windPhase) * 0.006) * wind
        const x = state.width / 2 + wrapped + windX
        const y = centerY + (bend > 0 ? arc : -arc) * 0.72 + windY
        const rotation = (bend > 0 ? -1 : 1) * Math.sign(wrapped || 1) * Math.asin(Math.min(1, effective / radius)) * 0.72 + windRotation
        return { media, x, y, rotation, opacity: 1, depth: Math.abs(wrapped) }
      }).sort((a, b) => b.depth - a.depth)

      renderItems.forEach(({ media, x, y, rotation, opacity }) => {
        drawPlane(media.texture, media.imageSize, x, y, state.cardW, state.cardH, rotation, opacity, borderRadius, shaderSpeed)
        const titleH = 35
        const titleW = titleH * (media.titleSize[0] / media.titleSize[1])
        drawPlane(media.titleTexture, media.titleSize, x, y + state.cardH / 2 + 42, titleW, titleH, rotation, opacity, 0)
      })

      state.last = state.current
      state.raf = window.requestAnimationFrame(render)
    }

    const onWheel = (event) => {
      if (!container.matches(':hover')) return
      event.preventDefault()
      state.target += (event.deltaY > 0 ? 1 : -1) * state.step * scrollSpeed * 0.18
    }
    const onPointerDown = (event) => {
      state.dragging = true
      state.start = event.clientX
      state.startTarget = state.target
      container.setPointerCapture?.(event.pointerId)
      container.classList.add('is-dragging')
    }
    const onPointerMove = (event) => {
      if (!state.dragging) return
      state.target = state.startTarget - (event.clientX - state.start)
    }
    const onPointerUp = (event) => {
      if (!state.dragging) return
      state.dragging = false
      state.target = Math.round(state.target / state.step) * state.step
      container.releasePointerCapture?.(event.pointerId)
      container.classList.remove('is-dragging')
    }
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        state.target += state.step
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        state.target -= state.step
      }
    }

    resize()
    render()
    window.addEventListener('resize', resize)
    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('pointerdown', onPointerDown)
    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerup', onPointerUp)
    container.addEventListener('pointercancel', onPointerUp)
    container.addEventListener('keydown', onKeyDown)

    return () => {
      window.cancelAnimationFrame(state.raf)
      window.removeEventListener('resize', resize)
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('pointerdown', onPointerDown)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerup', onPointerUp)
      container.removeEventListener('pointercancel', onPointerUp)
      container.removeEventListener('keydown', onKeyDown)
      canvas.remove()
    }
  }, [items, bend, borderRadius, scrollSpeed, scrollEase, textColor])

  return <div
    className="circular-gallery skills-circular-gallery"
    ref={ref}
    tabIndex={0}
    role="region"
    aria-label="Circular image gallery. Use left and right arrow keys to navigate."
  />
}
