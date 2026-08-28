import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const MAX_COLORS = 8

const fragmentShader = `
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = uPointer - rp;
  q += toward * uMouseInfluence * 0.2;

  vec2 s = q;
  vec3 sumCol = vec3(0.0);
  float cover = 0.0;
  for (int i = 0; i < MAX_COLORS; ++i) {
    if (i >= uColorCount) break;
    s -= 0.01;
    vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
    float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
    float kBelow = clamp(uWarpStrength, 0.0, 1.0);
    float kMix = pow(kBelow, 0.3);
    float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
    vec2 disp = (r - s) * kBelow;
    vec2 warped = s + disp * gain;
    float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
    float m = mix(m0, m1, kMix);
    float w = 1.0 - exp(-6.0 / exp(6.0 * m));
    sumCol += uColors[i] * w;
    cover = max(cover, w);
  }

  vec3 col = clamp(sumCol, 0.0, 1.0);
  float a = uTransparent > 0 ? cover : 1.0;
  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col = clamp(col + (n - 0.5) * uNoise, 0.0, 1.0);
  }

  vec3 rgb = uTransparent > 0 ? col * a : col;
  gl_FragColor = vec4(rgb, a);
}
`

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

export default function FlareCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const geometry = new THREE.PlaneGeometry(2, 2)
    const colorUniforms = Array.from({ length: MAX_COLORS }, (_, index) => (
      index === 0
        ? new THREE.Vector3(0x18 / 255, 0x49 / 255, 0x9b / 255)
        : new THREE.Vector3(0, 0, 0)
    ))
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uCanvas: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uSpeed: { value: 0.15 },
        uRot: { value: new THREE.Vector2(1, 0) },
        uColorCount: { value: 1 },
        uColors: { value: colorUniforms },
        uTransparent: { value: 1 },
        uScale: { value: 0.6 },
        uFrequency: { value: 1 },
        uWarpStrength: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: 0.5 },
        uParallax: { value: 1 },
        uNoise: { value: 0 },
      },
      premultipliedAlpha: true,
      transparent: true,
    })

    scene.add(new THREE.Mesh(geometry, material))
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
      alpha: true,
    })
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)

    const clock = new THREE.Clock()
    const pointerTarget = new THREE.Vector2(0, 0)
    const pointerCurrent = new THREE.Vector2(0, 0)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame = 0

    const handleResize = () => {
      const width = container.clientWidth || 1
      const height = container.clientHeight || 1
      renderer.setSize(width, height, false)
      material.uniforms.uCanvas.value.set(width, height)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)
    handleResize()

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / (rect.width || 1)) * 2 - 1
      const y = -(((event.clientY - rect.top) / (rect.height || 1)) * 2 - 1)
      pointerTarget.set(x, y)
    }

    const handlePointerLeave = () => pointerTarget.set(0, 0)

    const render = () => {
      const delta = clock.getDelta()
      const elapsed = clock.elapsedTime
      material.uniforms.uTime.value = reduceMotion ? 0 : elapsed
      const angle = reduceMotion ? 0 : (2 * elapsed * Math.PI) / 180
      material.uniforms.uRot.value.set(Math.cos(angle), Math.sin(angle))
      pointerCurrent.lerp(pointerTarget, Math.min(1, delta * 8))
      material.uniforms.uPointer.value.copy(pointerCurrent)
      renderer.render(scene, camera)
      if (!reduceMotion) animationFrame = requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', handlePointerLeave)
    render()

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement)
    }
  }, [])

  return <div id="flare-canvas" ref={containerRef} aria-hidden="true" />
}
