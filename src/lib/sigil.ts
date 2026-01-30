export function generateSigilSVG(seed: string) {
  // seed format: "o-a-f-s" numbers or words; simple parser for prototype
  const parts = seed.split('-')
  const [o='1', a='1', f='1', s='1'] = parts
  const w = 320
  const cx = w/2
  const cy = w/2

  // simple shapes by origin
  const core = (()=>{
    switch (o.toString()){
      case 'order': return `<rect x="90" y="90" width="140" height="140" rx="12" fill="rgba(255,255,255,0.06)"/>`
      case 'void': return `<circle cx="${cx}" cy="${cy}" r="60" stroke="rgba(255,255,255,0.08)" fill="none" stroke-width="6"/>`
      case 'wild': return `<path d="M160 80 C200 120 160 200 200 240" stroke="rgba(255,255,255,0.06)" fill="none"/>`
      default: return `<circle cx="${cx}" cy="${cy}" r="28" fill="rgba(255,255,255,0.08)"/>`
    }
  })()

  const frame = `<g stroke="rgba(255,255,255,0.04)" stroke-width="2"> <path d="M40 160 L280 160"/> <path d="M160 40 L160 280"/> </g>`
  const array = `<g fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"> <circle cx="${cx}" cy="${cy}" r="120"/> </g>`
  const fracture = s === 'tyrant' ? `<rect x="30" y="30" width="260" height="260" stroke="rgba(255,0,0,0.04)" fill="none" stroke-width="8"/>` : ''

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${w}" class="sigil">
    <rect width="100%" height="100%" fill="transparent" />
    <g id="core">${core}</g>
    <g id="frame">${frame}</g>
    <g id="array">${array}</g>
    <g id="fracture">${fracture}</g>
  </svg>`

  return svg
}
